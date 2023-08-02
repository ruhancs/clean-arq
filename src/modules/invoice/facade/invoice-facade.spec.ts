import { Sequelize } from "sequelize-typescript"
import InvoiceModel from "../repository/invoice.model"
import ProductModel from "../repository/product.model"
import Product from "../domain/product.entity"
import Id from "../../@shared/domain/value-object/id.value-object"
import { InputGenerateInvoiceFacadeDto } from "./invoice-facade.interface"
import InvoiceFacadeFactory from "../factory/invoice-facade.factory"
import Address from "../domain/value-object/address.value-object"

const product1 = new Product({
    id: new Id("1"),
    name: "P1",
    price: 10
})
const product2 = new Product({
    id: new Id("2"),
    name: "P2",
    price: 10
})

const products = [product1,product2]

describe("Invoice facade test", () => {
    let sequelize: Sequelize

    beforeEach( async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true},
        })

        sequelize.addModels([InvoiceModel,ProductModel])
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should save an invoice", async () => {
        const address = new Address({
            state: "St1",
            street: "S1",
            city: "C1",
            number: 1,
            zip: "Z1",
        })
        const input: InputGenerateInvoiceFacadeDto = {
            name: "I1",
            document: "D1",
            address: address,
            items: products.map((p) => {
                return {
                    id: p.id.id,
                    name: p.name,
                    price: p.price
                }
            })
        } 

        const invoiceFacade = InvoiceFacadeFactory.create()
        const invoice = await invoiceFacade.generate(input)

        expect(invoice.id).toBeDefined()
        expect(invoice.name).toBe("I1")
        expect(invoice.state).toBe("St1")
        expect(invoice.number).toBe(1)
    })
})