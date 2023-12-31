import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import ClientGateway from "../../gateway/client.gateway";
import { InputAddClientDto, OutputAddClientDto } from "./add-client-usecase.dto";


export default class AddClientUseCase {
    constructor(private clientRepository: ClientGateway) {}

    async execute(input: InputAddClientDto): Promise<OutputAddClientDto> {
        const props = {
            id: new Id(input.id) || new Id(),
            name: input.name,
            email: input.email,
            address: input.address
        }

        const client = new Client(props)
        await this.clientRepository.add(client)
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