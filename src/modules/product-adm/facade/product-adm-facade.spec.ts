import { Sequelize } from "sequelize-typescript"
import { ProductModel } from "../repository/product.model"
import ProductAdmFacadeFactory from "../factory/facade.factory"

describe("Product ADM facade test", () => {
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
        const input = {
            id: "1",
            name: "P1",
            description: "Product 1",
            purchasePrice: 10,
            stock: 3,
        }
 
        const productFacade = ProductAdmFacadeFactory.create()
        await productFacade.addProduct(input)
        
        const product = await ProductModel.findOne({
            where: {id: input.id}
        })

        expect(product).toBeDefined()
        expect(product.dataValues.id).toBe(input.id)
        expect(product.dataValues.name).toBe(input.name)
    })
    
    it("should verify a product stock", async() => {

        const inputCreateProduct = {
            id: "1",
            name: "P1",
            description: "Product 1",
            purchasePrice: 10,
            stock: 3,
        }
        
        const inputCheckStock = {
            productId: "1",
        }
        
        const productFacade = ProductAdmFacadeFactory.create()
        await productFacade.addProduct(inputCreateProduct)
        const productStock = await productFacade.checkStock(inputCheckStock)

        expect(productStock).toBeDefined()
        expect(productStock.productId).toBe(inputCreateProduct.id)
        expect(productStock.stock).toBe(inputCreateProduct.stock)
    })
})