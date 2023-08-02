import AddClientUseCase from "./add-client.usecase"

const mockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn()
    }
}

describe("Add client use case unit test ", () => {
    it("should create a client", async () => {
        const clientRepository = mockRepository()
        const usecase = new AddClientUseCase(clientRepository)
        
        const input = {
            name: "C1",
            email: "E1",
            address: "A1"
        }
        
        const result = await usecase.execute(input)

        expect(clientRepository.add).toHaveBeenCalled()
        expect(result.id).toBeDefined()
        expect(result.name).toBe(input.name)
        expect(result.email).toBe(input.email)
    })
})