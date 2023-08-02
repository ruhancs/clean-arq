import Id from "../../../@shared/domain/value-object/id.value-object"
import Product from "../../domain/product.entity"
import CheckStockUseCase from "./check-stock.usecase"

const product = new Product({
    id: new Id(),
    name: "P1",
    description: "D1",
    purchasePrice: 10,
    stock: 5
})

const mockRepository = {
    add: jest.fn(),
    find: jest.fn().mockResolvedValue(product),
}

describe("check stock Product usecase unit test", () => {
    it("should add an product", async () => {
        const productRepository = mockRepository

        const input = {
            productId: product.id.id
        }
        const useCase = new CheckStockUseCase(productRepository);
        const result = await useCase.execute(input)

        expect(result.productId).toBe(product.id.id)
        expect(result.stock).toBe(product.stock)
    })
})