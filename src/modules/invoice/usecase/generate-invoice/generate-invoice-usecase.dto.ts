import Address from "../../domain/value-object/address.value-object"

export interface InputGenerateInvoiceUseCaseDto {
    name: string
    document: string
    address: Address,
    items: {
        id: string,
        name: string,
        price: number
    }[]
}

export interface OutputGenerateInvoiceUseCaseDto {
    id: string
    name: string
    document: string
    street: string
    number: number
    state: string
    city: string
    zip: string
    items: {
        id: string,
        name: string,
        price: number
    }[]
    total: number
}