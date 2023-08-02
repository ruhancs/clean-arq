import { Sequelize } from "sequelize-typescript"
import ClientModel from "./client.model"
import ClientRepository from "./client.repository"
import Client from "../domain/client.entity"
import Id from "../../@shared/domain/value-object/id.value-object"

describe("Client repository test", () => {
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
        const client = new Client({
            id: new Id("1"),
            name: "C1",
            email: "E1",
            address: "A1",
        })

        const clientRepository = new ClientRepository()
        await clientRepository.add(client)

        const clientCreated = await ClientModel.findOne({
            where: {id: client.id.id}
        })

        expect(clientCreated.dataValues.id).toBe("1")
        expect(clientCreated.dataValues.name).toBe("C1")
        expect(clientCreated.dataValues.email).toBe("E1")
        expect(clientCreated.dataValues.address).toBe("A1")
    })

    it("should find a client", async() => {
        const client = await ClientModel.create({
            id: "1",
            name: "C1",
            email: "E1",
            address: "A1",
            createdAt: new Date(),
            updatedAt: new Date()
        })

        const clientRepository = new ClientRepository()
        const result = await clientRepository.find("1")

        expect(result.id.id).toEqual(client.dataValues.id)
        expect(result.name).toEqual(client.dataValues.name)
        expect(result.email).toEqual(client.dataValues.email)
        expect(result.address).toEqual(client.dataValues.address)
    })
})