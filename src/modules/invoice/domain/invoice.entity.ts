import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface"
import BaseEntity from "../../@shared/domain/entity/base.entity"
import Id from "../../@shared/domain/value-object/id.value-object"
import Address from "./value-object/address.value-object"
import Product from "./product.entity"

type InvoceProps = {
    id?: Id
    name: string
    document: string
    address: Address
    items: Product[]
    createdAt?: Date
    updatedAt?: Date
}

export default class Invoice extends BaseEntity implements AggregateRoot {
    private _name: string
    private _document: string
    private _address: Address
    private _items: Product[]

    constructor(props: InvoceProps) {
        super(props.id, props.createdAt, props.updatedAt)
        this._name = props.name
        this._document = props.document
        this._address = props.address
        this._items = props.items
    }

    get name(): string{
        return this._name
    }
    get documet(): string{
        return this._document
    }
    get address(): Address{
        return this._address
    }
    get items(): Product[]{
        return this._items
    }

    total(): number {
        const total = this._items.reduce((acc,product) => {
            return acc + product.price
        },0)
        return total
    }
}