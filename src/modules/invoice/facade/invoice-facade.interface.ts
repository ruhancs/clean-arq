import Address from "../domain/value-object/address.value-object"

export interface InputGenerateInvoiceFacadeDto {
    name: string
    document: string
    address: Address
    items: {
        id: string,
        name: string,
        price: number
    }[]
}

export interface OutputGenerateInvoiceFacadeDto {
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

export interface InputFindInvoiceFacadeDto {
    id: string
}

export interface OutputFindInvoiceFacadeDto {
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

export interface InvoiceFacadeInterface{
    find(input: InputFindInvoiceFacadeDto): Promise<OutputFindInvoiceFacadeDto>
    generate(input: InputGenerateInvoiceFacadeDto): Promise<OutputGenerateInvoiceFacadeDto>
}