import Transaction from "../../domain/transaction";
import PaymentGateway from "../../gateway/payment.gateway";
import { InputProcessPaymentDto, OutputProcessPaymentDto } from "./process-payment-usecase.dto";

export default class ProcessPaymentUseCase {
    constructor(private TransactionRepository: PaymentGateway, ) {}

    async execute(input: InputProcessPaymentDto): Promise<OutputProcessPaymentDto> {
        const transaction = new Transaction({
            amount: input.amount,
            orderId: input.orderId
        })
        transaction.process()//faz as validacoes da transacao consutaria a gateway e pegar o resutado da gateway

        const persistTransaction = await this.TransactionRepository.save(transaction)

        return {
            transactionId: persistTransaction.orderId,
            orderId: persistTransaction.orderId,
            amount: persistTransaction.amount,
            status: persistTransaction.status,
            createdAt: persistTransaction.createdAt,
            updatedAt: persistTransaction.updatedAt
        }
    }
}