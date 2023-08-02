import { Sequelize } from "sequelize-typescript"
import Invoice from "../domain/invoice.entity"
import Id from "../../@shared/domain/value-object/id.value-object"
import Address from "../domain/value-object/address.value-object"
import Product from "../domain/product.entity"
import InvoiceRepository from "./invoice-repository"
import InvoiceModel from "./invoice.model"
import ProductModel from "./product.model"

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

describe("Invoice repository test", () => {
    let sequelize: Sequelize

    beforeEach( async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true},
        })

        sequelize.addModels([InvoiceModel, ProductModel])
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should save an invoice", async () => {
        const invoice = new Invoice({
            id: new Id("1"),
            name: "I1",
            document: "D1",
            address: new Address({
                state: "St1",
                city: "C1",
                street: "S1",
                number: 1,
                zip: "Z1"
            }),
            items: [product1,product2],
        })
        const invoiceRepository = new InvoiceRepository()
        await invoiceRepository.generate(invoice)

        const invoiceCreated = await InvoiceModel.findOne({
            where: {id: "1"}
        })

        expect(invoiceCreated.dataValues.id).toBe("1")
        expect(invoiceCreated.dataValues.name).toBe("I1")
        expect(invoiceCreated.dataValues.document).toBe("D1")
        expect(invoiceCreated.dataValues.street).toBe("S1")
        expect(invoiceCreated.dataValues.number).toBe(1)
        expect(invoiceCreated.dataValues.zip).toBe("Z1")
    })

    it("should find a invoice", async () => {
        const invoice = new Invoice({
            id: new Id("1"),
            name: "I1",
            document: "D1",
            address: new Address({
                state: "St1",
                city: "C1",
                street: "S1",
                number: 1,
                zip: "Z1"
            }),
            items: [product1,product2],
        })
        const invoiceRepository = new InvoiceRepository()
        await invoiceRepository.generate(invoice)

        const invoiceFounded = await invoiceRepository.find("1")

        expect(invoiceFounded.id.id).toBe("1")
        expect(invoiceFounded.name).toBe("I1")
        expect(invoiceFounded.documet).toBe("D1")
        expect(invoiceFounded.items.length).toBe(2)
        expect(invoiceFounded.items[0].name).toBe("P1")
        expect(invoiceFounded.items[0].price).toBe(10)
        expect(invoiceFounded.items[1].name).toBe("P2")
        expect(invoiceFounded.items[1].price).toBe(10)
        
    })
})