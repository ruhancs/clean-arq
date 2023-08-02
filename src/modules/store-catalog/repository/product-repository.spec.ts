import { Sequelize } from "sequelize-typescript"
import ProductModel from "./product.model"
import ProductRepository from "./product.repository"

describe("Product repsitory test", () => {
    let sequelize: Sequelize

    beforeEach( async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true},
        })

        sequelize.addModels([ProductModel])
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should find all products",async () => {
        await ProductModel.create({
            id: "1",
            name: "P1",
            description: "D1",
            salesPrice: 10
        })
        await ProductModel.create({
            id: "2",
            name: "P2",
            description: "D2",
            salesPrice: 20
        })

        const productRepository = new ProductRepository()

        const allProducts = await productRepository.findAll()

        expect(allProducts.length).toBe(2)
        expect(allProducts[0].name).toBe("P1")
        expect(allProducts[0].description).toBe("D1")
        expect(allProducts[1].name).toBe("P2")
        expect(allProducts[1].description).toBe("D2")
    })

    it("should find one product", async() => {
        await ProductModel.create({
            id: "1",
            name: "P1",
            description: "D1",
            salesPrice: 10
        })

        const productRepository = new ProductRepository()
        const product = await productRepository.find("1")

        expect(product.id.id).toBe("1")
        expect(product.name).toBe("P1")
        expect(product.description).toBe("D1")
        expect(product.salesPrice).toBe(10)
    })
})