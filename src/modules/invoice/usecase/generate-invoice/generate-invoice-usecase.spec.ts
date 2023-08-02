import Id from "../../../@shared/domain/value-object/id.value-object"
import Product from "../../domain/product.entity"
import Address from "../../domain/value-object/address.value-object"
import GenerateInvoiceUseCase from "./generate-invoice.usecase"

const mockRepository = () => {
    return {
        generate: jest.fn(),
        find: jest.fn(),
    }
}

describe("Generate invoice use case test", () => {
    it("should generate an invoice", async() => {
        const invoiceRepository = mockRepository()
        const generateInvoiceUseCase = new GenerateInvoiceUseCase(invoiceRepository)

        const address = new Address({
            street: "S1",
            number: 1,
            zip: "Z1",
            city: "C1",
            state: "ST1",
        })

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

        const input = {
            name: "I1",
            document: "D1",
            address: new Address({
                street: "S1",
                number: 1,
                state: "St1",
                city: "C1",
                zip: "Z1",
            }),
            items: products.map((product) => ({
                id:product.id.id,
                name: product.name,
                price: product.price
            })),
        }

        const result = await generateInvoiceUseCase.execute(input)

        expect(invoiceRepository.generate).toHaveBeenCalled()
        expect(result.id).toBeDefined()
        expect(result.name).toBe(input.name)
        expect(result.document).toBe(input.document)
        expect(result.total).toBe(20)
    })
})