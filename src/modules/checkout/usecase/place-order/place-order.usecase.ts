import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import { ClientAdmFacadeInterface } from "../../../client-adm/facade/client-adm-facde.interface";
import { InvoiceFacadeInterface } from "../../../invoice/facade/invoice-facade.interface";
import { PaymentFacadeInterface } from "../../../payment/facade/payment-facade.interface";
import { ProductAdminFacadeInterface } from "../../../product-adm/facade/product-admin-facade.interface";
import { StoreCatalogFacadeInterface } from "../../../store-catalog/facade/store-catalog-facade.interface";
import Client from "../../domain/client.entity";
import Order from "../../domain/order.entity";
import Product from "../../domain/product.entity";
import CheckoutGateway from "../../gateway/checkout.gateway";
import { InputPlaceOrderDto, OutputPlaceOrderDto } from "./place-order-usecase.dto";

export default class PlaceOrderUseCase implements UseCaseInterface {
    private _clientFacade: ClientAdmFacadeInterface
    private _productFacade: ProductAdminFacadeInterface
    private _catalogFacade: StoreCatalogFacadeInterface
    private _repository: CheckoutGateway
    private _invoiceFacade: InvoiceFacadeInterface
    private _paymentFacade: PaymentFacadeInterface
    constructor(
        clientFacade: ClientAdmFacadeInterface, 
        productFacade: ProductAdminFacadeInterface,
        catalogFacade: StoreCatalogFacadeInterface,
        repository: CheckoutGateway,
        invoiceFacade: InvoiceFacadeInterface,
        paymentFacade: PaymentFacadeInterface
        ){
        this._clientFacade = clientFacade
        this._productFacade = productFacade
        this._catalogFacade = catalogFacade
        this._repository = repository
        this._invoiceFacade = invoiceFacade
        this._paymentFacade = paymentFacade
    }

    async execute(input: InputPlaceOrderDto): Promise<OutputPlaceOrderDto> {
        const client = await this._clientFacade.find({id: input.clientId})
        if(!client) {
            throw new Error("Client not found")
        }

        await this.validateProducts(input)

        const products = await Promise.all(
            input.products.map((product) => this.getProduct(product.productId))
        )

        const myClient = new Client({
            id: new Id(client.id),
            name: client.name,
            email: client.email,
            address: client.address
        })

        const order = new Order({
            client: myClient,
            products: products
        })

        const payment = await this._paymentFacade.process({
            orderId: order.id.id,
            amount: order.total
        })

       const invoice = payment.status === "approved" ? await this._invoiceFacade.generate({
            name: client.name,
            document: client.email,
            address: client.address,
            items: products.map((p) => {
                return {
                    id: p.id.id,
                    name: p.name,
                    price: p.salesPrice,
                }
            })
        }): null

        payment.status === "approved" && order.approved()
        await this._repository.addOrder(order)

        return {
            id: order.id.id,
            invoiceId: payment.status === "approved" ? invoice.id : null,
            status: order.status,
            total: order.total,
            products: order.products.map((p) => {
                return {
                    productId: p.id.id,
                }
            }),
        }
    }

    private async getProduct(productId: string): Promise<Product> {
        const product = await this._catalogFacade.find({id: productId})
        if(!product) {
            throw new Error("Products not found")
        }
        const productProps = {
            id: new Id(product.id),
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice,
        }
        return new Product(productProps)
    }

    private async validateProducts(input: InputPlaceOrderDto): Promise<void> {
        if(input.products.length === 0) {
            throw new Error("No products selected")
        }

        for(let p of input.products) {
            const product = await this._productFacade.checkStock({
                productId: p.productId
            })

            if(product.stock <= 0) {
                throw new Error("Product is not available in stock")
            }
        }
    }
}