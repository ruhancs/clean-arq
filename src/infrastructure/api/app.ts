import express, {Express} from "express"
import { Sequelize } from "sequelize-typescript"
import ClientModel from "../../modules/client-adm/repository/client.model"
import { ProductModel } from "../../modules/product-adm/repository/product.model"
import TransactionModel from "../../modules/payment/repository/transaction.model"

export const app: Express = express()

app.use(express.json())

//Routes


export let sequelize: Sequelize

async function setupDb() {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false
    })
    sequelize.addModels([ClientModel,ProductModel,TransactionModel])
    await sequelize.sync()
}
setupDb()