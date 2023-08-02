import { Sequelize } from "sequelize-typescript"
import { ProductModel } from "./product.model"
import Product from "../domain/product.entity"
import Id from "../../@shared/domain/value-object/id.value-object"
import ProductRepository from "./product.repository"

describe("ProductRepository unit test", () => {
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

    it("should create a product", async() => {
        const productProps = {
            id: new Id("1"),
            name: "P1",
            description: "Product 1",
            purchasePrice: 10,
            stock: 3,
        }
        const product = new Product(productProps)
        const productRepository = new ProductRepository()
        await productRepository.add(product)

        const productCreated = await ProductModel.findOne({
            where: {
                id: productProps.id.id
            }
        })

        expect(productProps.id.id).toEqual(productCreated.dataValues.id)
        expect(productProps.name).toEqual(productCreated.dataValues.name)
        expect(productProps.description).toEqual(productCreated.dataValues.description)
        expect(productProps.purchasePrice).toEqual(productCreated.dataValues.purchasePrice)
        expect(productProps.stock).toEqual(productCreated.dataValues.stock)
    })

    it("should find a product", async() => {
        const productProps = {
            id: new Id("1"),
            name: "P1",
            description: "Product 1",
            purchasePrice: 10,
            stock: 3,
        }
        const product = new Product(productProps)
        const productRepository = new ProductRepository()
        await productRepository.add(product)

        const productFounded = await productRepository.find(productProps.id.id)

        expect(product.id.id).toBe(productProps.id.id)
        expect(product.name).toBe(productProps.name)
        expect(product.description).toBe(productProps.description)
    })
})