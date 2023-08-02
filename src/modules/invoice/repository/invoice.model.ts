import { Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript"
import ProductModel from "./product.model"

@Table({
    tableName: "invoices",
    timestamps: false
})
export default class InvoiceModel extends Model {
    @PrimaryKey
    @Column({allowNull: false})
    id: string
    
    @Column({allowNull: false})
    name: string
    
    @Column({allowNull: false})
    document: string
   
    @Column({ allowNull: false })
    declare street: string;
  
    @Column({ allowNull: false })
    declare number: number;
  
    @Column({ allowNull: false })
    declare zip: string;
  
    @Column({ allowNull: false })
    declare city: string;
   
    @Column({ allowNull: false })
    declare state: string;
    
    @HasMany(() => ProductModel)
    items: ProductModel[];
    
    @Column({allowNull: false})
    createdAt: Date
    
    @Column({allowNull: false})
    updatedAt: Date

}