import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import { AddProductFacadeInputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto, ProductAdminFacadeInterface } from "./product-admin-facade.interface";

export interface UseCasesProps {
    addProductUseCase: UseCaseInterface
    checkStockUseCase: UseCaseInterface
}

export default class ProductAdmFacade implements ProductAdminFacadeInterface {
    private _addProductUseCase: UseCaseInterface
    private _checkStockUseCase: UseCaseInterface

    constructor(useCaseProp: UseCasesProps) {
        this._addProductUseCase = useCaseProp.addProductUseCase
        this._checkStockUseCase = useCaseProp.checkStockUseCase
    }

    addProduct(input: AddProductFacadeInputDto): Promise<void> {
        //caso o dto do use case for diferente do dto da facade, devera converter o dto da facade para o dto do usecase
        return this._addProductUseCase.execute(input)
    }
    checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
        return this._checkStockUseCase.execute(input)
    }
    
}