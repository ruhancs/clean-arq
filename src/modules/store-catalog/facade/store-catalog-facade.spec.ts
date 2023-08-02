import { Sequelize } from "sequelize-typescript"
import ProductModel from "../repository/product.model"
import StoreCatalogFacadeFactory from "../factory/Facade.factory"

describe("Store catalog facade test", () => {
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

    it("should find a product", async () => {
        await ProductModel.create({
            id: "1",
            name: "P1",
            description: "D1",
            salesPrice: 10
        })

        const storeCatalogFacade = StoreCatalogFacadeFactory.create()

        const result = await storeCatalogFacade.find({id: "1"})

        expect(result.id).toBe("1")
        expect(result.name).toBe("P1")
        expect(result.description).toBe("D1")
        expect(result.salesPrice).toBe(10)
    })
    
    it("should find all product", async () => {
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

        const storeCatalogFacade = StoreCatalogFacadeFactory.create()

        const result = await storeCatalogFacade.findAll()

        expect(result.products[0].id).toBe("1")
        expect(result.products[0].name).toBe("P1")
        expect(result.products[0].description).toBe("D1")
        expect(result.products[0].salesPrice).toBe(10)
        expect(result.products[1].id).toBe("2")
        expect(result.products[1].name).toBe("P2")
        expect(result.products[1].description).toBe("D2")
        expect(result.products[1].salesPrice).toBe(20)
    })

})