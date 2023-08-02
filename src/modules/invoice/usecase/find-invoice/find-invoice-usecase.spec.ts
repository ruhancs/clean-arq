import Id from "../../../@shared/domain/value-object/id.value-object"
import Invoice from "../../domain/invoice.entity"
import Product from "../../domain/product.entity"
import FindInvoiceUseCase from "./find-invoice.usecase"

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

const outputMock = {
    id: "1",
    name: "I1",
    document: "D1",
    address: {
        street: "S1",
        number: 1,
        state: "St1",
        city: "C1",
        zip: "Z1",
    },
    items: products.map((product) => ({
        id:product.id.id,
        name: product.name,
        price: product.price
    })),
    total: jest.fn().mockReturnValue(20),
    createdAt: new Date()
}

const mockRepository = () => {
    return {
        generate: jest.fn(),
        find: jest.fn().mockResolvedValue(outputMock)
    }
}

describe("Find invoice use case test", () => {
    it("should find an invoice", async () => {
        const invoiceRepository = mockRepository()
        const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepository)

        const input = {
            id: "1"
        }
        const output = await findInvoiceUseCase.execute(input)

        expect(invoiceRepository.find).toHaveBeenCalled()
    })
})