import ClientGateway from "../../gateway/client.gateway";
import { InputFindClientDto, OutputFindClientDto } from "./find-client.dto";

export default class FindClientUseCase {
    constructor(private clientRepository: ClientGateway) {}

    async execute(input: InputFindClientDto): Promise<OutputFindClientDto> {
        const client = await this.clientRepository.find(input.id)
        
        return {
            id: client.id.id,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    }
}