import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import { ClientAdmFacadeInterface, InputAddClientFacadeDto, InputFindClientFacadeDto, OutputFindClientFacadeDto } from "./client-adm-facde.interface";

export interface UseCaseProps {
    findUseCase: UseCaseInterface,
    addUseCase: UseCaseInterface
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
    private _findUseCase: UseCaseInterface
    private _addUseCase: UseCaseInterface
    constructor(props: UseCaseProps) {
        this._findUseCase = props.findUseCase
        this._addUseCase = props.addUseCase
    }
    async add(input: InputAddClientFacadeDto): Promise<void> {
        await this._addUseCase.execute(input)
    }
    async find(input: InputFindClientFacadeDto): Promise<OutputFindClientFacadeDto> {
        return this._findUseCase.execute(input)
    }
}