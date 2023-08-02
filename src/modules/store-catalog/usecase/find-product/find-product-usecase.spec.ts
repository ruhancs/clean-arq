import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindProductUseCase from "./find-product.usecase";

const product = new Product({
    id: new Id("1"),
    name: "P1",
    description: "D1",
    salesPrice: 10
})

const mockRepository = () => {
    return {
        findAll: jest.fn(),
        find: jest.fn().mockResolvedValue(product)
    }
}

describe("Find product use case unit test",  () => {
    it("should find a product", async () => {
        const productRepository = mockRepository()
        const usecase = new FindProductUseCase(productRepository)

        const input = {
            id: "1"
        }
        const result = await usecase.execute(input)

        expect(productRepository.find).toHaveBeenCalled()
        expect(result.id).toBe(product.id.id)
        expect(result.name).toBe(product.name)
        expect(result.description).toBe(product.description)
        expect(result.salesPrice).toBe(product.salesPrice)
    })
})