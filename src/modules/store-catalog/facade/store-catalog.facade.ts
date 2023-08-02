import FindAllProductsUseCase from "../usecase/find-all-products/find-all-product.usecase";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";
import { InputFindStoreCatalogFacadeDto, OutputFindAllStoreCatalogFacadeDto, OutputFindStoreCatalogFacadeDto, StoreCatalogFacadeInterface } from "./store-catalog-facade.interface";

export interface StoreCatalogUseCaseProps {
    findUseCase: FindProductUseCase,
    findAllUseCase: FindAllProductsUseCase
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
    private _findUseCase: FindProductUseCase
    private _findAllUseCase: FindAllProductsUseCase
    constructor(props: StoreCatalogUseCaseProps) {
        this._findUseCase = props.findUseCase
        this. _findAllUseCase = props.findAllUseCase
    }
    
    async find(id: InputFindStoreCatalogFacadeDto): Promise<OutputFindStoreCatalogFacadeDto> {
        const product = await this._findUseCase.execute(id)
        console.log(product.id)
        console.log(product.name)
        return this._findUseCase.execute(id)
    }
    
    async findAll(): Promise<OutputFindAllStoreCatalogFacadeDto> {
        return this._findAllUseCase.execute()
    }
    
}