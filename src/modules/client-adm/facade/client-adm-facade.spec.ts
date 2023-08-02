import { Sequelize } from "sequelize-typescript"
import ClientModel from "../repository/client.model"
import FacadeFactory from "../factory/facade.factory"

describe("client adm facade test", () => {
    let sequelize: Sequelize

    beforeEach( async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true},
        })

        sequelize.addModels([ClientModel])
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should create a client", async () => {
        const facade = FacadeFactory.create()

        const input = {
            id: "1",
            name: "C1",
            email: "E1",
            address: "A1",
        }
        await facade.add(input)

        const clientCreated = await ClientModel.findOne({
            where: {id: input.id}
        })

        expect(clientCreated.dataValues.id).toBe("1")
        expect(clientCreated.dataValues.name).toBe("C1")
        expect(clientCreated.dataValues.email).toBe("E1")
        expect(clientCreated.dataValues.address).toBe("A1")
    })

    it("should find one client", async() => {
        const facade = FacadeFactory.create()

        const input = {
            id: "1",
            name: "C1",
            email: "E1",
            address: "A1",
            createdAt: new Date(),
            updatedAt: new Date()
        }

        await ClientModel.create(input)

        const client = await facade.find({id: "1"})

        expect(client.id).toBe("1")
        expect(client.name).toBe("C1")
        expect(client.email).toBe("E1")
        expect(client.address).toBe("A1")
    })
})