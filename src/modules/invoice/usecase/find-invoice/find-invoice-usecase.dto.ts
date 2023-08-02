export interface InputFindInvoiceDto {
    id: string
}

export interface OutputFindInvoiceDto {
    id: string
    name: string
    document: string
    address: {
        street: string
        number: number
        state: string
        city: string
        zip: string
    }
    items: {
        id: string,
        name: string,
        price: number
    }[]
    total: number
    createdAt: Date
}