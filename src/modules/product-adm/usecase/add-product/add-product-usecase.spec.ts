import AddProductUseCase from "./add-product.usecase"

const mockRepository = {
    add: jest.fn(),
    find: jest.fn(),
}

describe("Add Product usecase unit test", () => {
    it("should add an product", async () => {
        const productRepository = mockRepository

        const input = {
            name: "p1",
            description: "product 1",
            purchasePrice: 10,
            stock: 5
        }
        const useCase = new AddProductUseCase(productRepository);
        const result = await useCase.execute(input)

        expect(productRepository.add).toHaveBeenCalled()
        expect(result.id).toBeDefined()
        expect(result.name).toBe(input.name)
        expect(result.description).toBe(input.description)
        expect(result.purchasePrice).toBe(input.purchasePrice)
        expect(result.stock).toBe(input.stock)
    })
})