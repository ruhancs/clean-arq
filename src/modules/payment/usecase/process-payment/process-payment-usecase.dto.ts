
export interface InputProcessPaymentDto {
    amount: number
    orderId: string
}

export interface OutputProcessPaymentDto {
    transactionId: string
    orderId: string
    amount: number
    status: string
    createdAt: Date
    updatedAt: Date
} 