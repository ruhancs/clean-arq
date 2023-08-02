import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: "checkouts",
    timestamps: false
})
export default class CheckoutModel extends Model {
    @PrimaryKey
    @Column({allowNull: false})
    id: string
}