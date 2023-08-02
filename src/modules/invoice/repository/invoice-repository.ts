import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceModel from "./invoice.model";
import ProductModel from "./product.model";

export default class InvoiceRepository implements InvoiceGateway {
    async generate(invoice: Invoice): Promise<void> {
        await InvoiceModel.create({
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.documet,
            state: invoice.address.state,
            city: invoice.address.city,
            street: invoice.address.street,
            number: invoice.address.number,
            zip: invoice.address.zip,
            items: invoice.items.map((p) => {
                return {
                    id: p.id.id,
                    name: p.name,
                    price: p.price
                }
            }),
            //total: invoice.total(),
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {include: [{model: ProductModel}]}
        )
    }
    async find(id: string): Promise<Invoice> {
        const invoice = await InvoiceModel.findOne({
            where: {id:id},
            include: ["items"],
        })
        if(!invoice) {
            throw new Error("invoice not found")
        }

        return new Invoice({
            id: new Id(invoice.dataValues.id),
            name: invoice.dataValues.name,
            document: invoice.dataValues.document,
            address: invoice.dataValues.address,
            items: invoice.dataValues.items
        })
    }
}