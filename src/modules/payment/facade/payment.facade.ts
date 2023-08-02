import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import { InputPaymentFacadeDto, OutputPaymentFacadeDto, PaymentFacadeInterface } from "./payment-facade.interface";

export default class PaymentFacade implements PaymentFacadeInterface {
    constructor(private processPaymentUseCase: UseCaseInterface) {}

    async process(input: InputPaymentFacadeDto): Promise<OutputPaymentFacadeDto> {
        return this.processPaymentUseCase.execute(input)
    }
    
}