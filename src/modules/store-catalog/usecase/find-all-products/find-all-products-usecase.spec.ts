import Id from "../../../@shared/domain/value-object/id.value-object"
import Product from "../../domain/product.entity"
import FindAllProductsUseCase from "./find-all-product.usecase"

const product = new Product ({
    id: new Id("1"),
    name: "P1",
    description: "D1",
    salesPrice: 20
})

const product2 = new Product ({
    id: new Id("2"),
    name: "P2",
    description: "D2",
    salesPrice: 25
})

const mockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockResolvedValue([product,product2])
    }
}

describe("Find All products use case test", () => {
    it("should find all products", async () => {
        const productRepository = mockRepository()
        const useCase = new FindAllProductsUseCase(productRepository)

        const result = await useCase.execute()

        expect(productRepository.findAll).toHaveBeenCalled()
        expect(result.products.length).toBe(2)
        expect(result.products[0].id).toBe("1")
        expect(result.products[0].name).toBe("P1")
        expect(result.products[1].id).toBe("2")
        expect(result.products[1].name).toBe("P2")
    })
})