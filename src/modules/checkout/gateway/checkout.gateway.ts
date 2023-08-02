import Order from "../domain/order.entity";

export default interface CheckoutGateway {
    addOrder(order: Order): Promise<void>
    findOrder(orderId: string): Promise<Order> | null
}