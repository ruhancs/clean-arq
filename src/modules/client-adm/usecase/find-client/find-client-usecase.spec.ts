import Id from "../../../@shared/domain/value-object/id.value-object"
import Client from "../../domain/client.entity"
import FindClientUseCase from "./find-client.usecase"

const input = {
    name: "C1",
    email: "E1",
    address: "A1"
}

const client = new Client({
    id: new Id("1"),
    name: "C1",
    email: "E1",
    address: "A1"
})

const mockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockResolvedValue(client)
    }
}

describe("Find client use case unit test ", () => {
    it("should create a client", async () => {
        const clientRepository = mockRepository()
        const usecase = new FindClientUseCase(clientRepository)
        
        const input = {
            id: "1"
        }
        
        const result = await usecase.execute(input)

        expect(clientRepository.find).toHaveBeenCalled()
        expect(result.id).toBe(client.id.id)
        expect(result.name).toBe(client.name)
        expect(result.email).toBe(client.email)
    })
})