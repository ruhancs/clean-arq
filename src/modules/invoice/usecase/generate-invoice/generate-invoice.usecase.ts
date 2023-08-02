import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/product.entity";
import Address from "../../domain/value-object/address.value-object";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { InputGenerateInvoiceUseCaseDto, OutputGenerateInvoiceUseCaseDto } from "./generate-invoice-usecase.dto";

export default class GenerateInvoiceUseCase {
    constructor(private invoiceRepository: InvoiceGateway) {}

    async execute(input: InputGenerateInvoiceUseCaseDto): Promise<OutputGenerateInvoiceUseCaseDto> {
        const products = input.items.map((item) => {
            return new Product({
                id: new Id(item.id),
                name: item.name,
                price: item.price
            })
        })

        const invoice = new Invoice({
            id: new Id(),
            name: input.name,
            document: input.document,
            address: input.address,
            items: products
        })
        await this.invoiceRepository.generate(invoice)

        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.documet,
            street: invoice.address.street,
            number: invoice.address.number,
            city: invoice.address.street,
            state: invoice.address.state,
            zip: invoice.address.zip,
            items: products.map((product) => ({
                id:product.id.id,
                name: product.name,
                price: product.price
            })),
            total: invoice.total()
        }
    }
}