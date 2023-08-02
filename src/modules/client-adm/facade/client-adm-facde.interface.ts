import Address from "../../checkout/domain/value-object/address.value-object"

export interface InputAddClientFacadeDto {
    id?: string
    name: string
    email: string
    address: string
}

export interface InputFindClientFacadeDto {
    id: string
}

export interface OutputFindClientFacadeDto {
    id: string
    name: string
    email: string
    address: Address
    createdAt: Date
    updatedAt: Date
}

export interface ClientAdmFacadeInterface{
    add(input: InputAddClientFacadeDto): Promise<void>
    find(input: InputFindClientFacadeDto): Promise<OutputFindClientFacadeDto>
}