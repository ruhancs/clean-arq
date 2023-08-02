
export interface AddProductFacadeInputDto {
    id?: string; // ou Id
    name: string;
    description: string;
    purchasePrice: number;
    stock: number
}

export interface CheckStockFacadeInputDto {
    productId: string
}

export interface CheckStockFacadeOutputDto {
    productId: string
    stock: number
}

export interface ProductAdminFacadeInterface {
    addProduct(input: AddProductFacadeInputDto): Promise<void>;
    checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto>
}