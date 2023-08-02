
export interface InputFindStoreCatalogFacadeDto{
    id: string
}
export interface OutputFindStoreCatalogFacadeDto{
    id: string
    name: string
    description: string
    salesPrice: number
}

export interface OutputFindAllStoreCatalogFacadeDto {
    products: {
        id: string
        name: string
        description: string
        salesPrice: string
    }[]
}

export interface StoreCatalogFacadeInterface {
    find(id: InputFindStoreCatalogFacadeDto): Promise<OutputFindStoreCatalogFacadeDto>
    findAll(): Promise<OutputFindAllStoreCatalogFacadeDto>
}