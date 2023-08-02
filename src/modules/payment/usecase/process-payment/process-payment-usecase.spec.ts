import Id from "../../../@shared/domain/value-object/id.value-object";
import Transaction from "../../domain/transaction";
import ProcessPaymentUseCase from "./process-payment.usecase";


const transation = new Transaction({
    id: new Id("1"),
    amount: 200,
    orderId: "1",
    status: "approved"
})

const mockRepository = () => {
    return {
        save: jest.fn().mockResolvedValue(transation) 
    }
}

const transationDeclined = new Transaction({
    id: new Id("1"),
    amount: 99,
    orderId: "1",
    status: "declined"
})

const mockRejectRepository = () => {
    return {
        save: jest.fn().mockResolvedValue(transationDeclined) 
    }
}

describe("Payment use case test", () => {
    it("should approve a transaction",async () => {
        const paymentRepository = mockRepository()
        const usecase = new ProcessPaymentUseCase(paymentRepository)

        const input = {
            orderId: "1",
            amount: 200
        }

        const result = await usecase.execute(input)

        expect(paymentRepository.save).toHaveBeenCalled()
        expect(result.transactionId).toBe(transation.id.id)
        expect(result.orderId).toBe("1")
        expect(result.status).toBe("approved")
    })
    
    it("should decline a transaction", async() => {
        const paymentRepository = mockRejectRepository()
        const usecase = new ProcessPaymentUseCase(paymentRepository)
        
        const input = {
            orderId: "1",
            amount: 99
        }
        
        const result = await usecase.execute(input)

        expect(paymentRepository.save).toHaveBeenCalled()
        expect(result.transactionId).toBe(transation.id.id)
        expect(result.orderId).toBe("1")
        expect(result.status).toBe("declined")
    })
})