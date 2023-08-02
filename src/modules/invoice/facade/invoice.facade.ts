import UseCaseInterface from "../../@shared/usecase/usecase.interface"
import { InputFindInvoiceFacadeDto, InputGenerateInvoiceFacadeDto, InvoiceFacadeInterface, OutputFindInvoiceFacadeDto, OutputGenerateInvoiceFacadeDto } from "./invoice-facade.interface"

export interface UseCasesProps {
    find: UseCaseInterface
    generate: UseCaseInterface
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
    private _findInvoiceUseCase: UseCaseInterface
    private _generateInvoiceUseCase: UseCaseInterface
    constructor(props: UseCasesProps) {
        this._findInvoiceUseCase = props.find
        this._generateInvoiceUseCase = props.generate
    }
    find(input: InputFindInvoiceFacadeDto): Promise<OutputFindInvoiceFacadeDto> {
        return this._findInvoiceUseCase.execute(input)
    }
    generate(input: InputGenerateInvoiceFacadeDto): Promise<OutputGenerateInvoiceFacadeDto> {
        return this._generateInvoiceUseCase.execute(input)
    }
    
}