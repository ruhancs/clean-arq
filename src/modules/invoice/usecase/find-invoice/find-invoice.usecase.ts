import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { InputFindInvoiceDto, OutputFindInvoiceDto } from "./find-invoice-usecase.dto";

export default class FindInvoiceUseCase {
    constructor(private invoiceRepository: InvoiceGateway) {}

    async execute(input: InputFindInvoiceDto): Promise<OutputFindInvoiceDto> {
        const invoice = await this.invoiceRepository.find(input.id)

        const output = {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.documet,
            address: {
                street: invoice.address.street,
                number: invoice.address.number,
                state: invoice.address.state,
                city: invoice.address.city,
                zip: invoice.address.zip,
            },
            items: invoice.items.map((product) => ({
                id:product.id.id,
                name: product.name,
                price: product.price
            })),
            total: invoice.total(),
            createdAt: invoice.createdAt
        }

        return output
    }
}