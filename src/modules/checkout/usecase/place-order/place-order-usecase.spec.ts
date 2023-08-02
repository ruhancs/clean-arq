import Id from "../../../@shared/domain/value-object/id.value-object"
import Product from "../../domain/product.entity"
import { InputPlaceOrderDto } from "./place-order-usecase.dto"
import PlaceOrderUseCase from "./place-order.usecase"

const mockDate = new Date(2024,1,1)

describe("Place order use case test", () => {
    
    describe("validate products method", () => {
        //@ts-expect-error - no params in constructor
        const placeOrderUseCase = new PlaceOrderUseCase() 
        it("should throw an error if the product is out of stock", async () => {
            const mockProductFacade = {
                checkStock: jest.fn(({productId}: {productId:string}) => 
                    Promise.resolve({
                    productId,
                    stock: productId === "1" ? 0 : 1
                    })
                ),
            } 
            //@ts-expect-error - force set clientFacade
            placeOrderUseCase["_productFacade"] = mockProductFacade;

            let input: InputPlaceOrderDto = {
                clientId: "0",
                products: [{productId: "1"}]
            }

            await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow(
                new Error("Product is not available in stock")
            )

            input = {
                clientId: "0",
                products: [{productId: "0"},{productId: "1"}]
            }
            await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow(
                new Error("Product is not available in stock")
            )
            expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(3)
        })
    })

    describe("get products method", () => {
        beforeAll(() => {
            jest.useFakeTimers()
            jest.setSystemTime(mockDate)
        })

        afterAll(() => {
            jest.useRealTimers()
        })

        //@ts-expect-error - no params in constructor
        const placeOrderUseCase = new PlaceOrderUseCase()
        it("should throw error when product not found", async () => {
            const mockCatalogfacade = {
                find: jest.fn().mockResolvedValue(null)
            }

            //@ts-expect-error - force set catalogFacade
            placeOrderUseCase["_catalogFacade"] = mockCatalogfacade

            await expect(placeOrderUseCase["getProduct"]("0")).rejects.toThrow(
                new Error("Products not found")
            )
        })

        it("should return a product", async () => {
            const mockCatalogFacade = {
                find: jest.fn().mockResolvedValue({
                    id: "0",
                    name: "P0",
                    description: "D0",
                    salesPrice: 10
                })
            }

            //@ts-expect-error - force set catalogFacade
            placeOrderUseCase["_catalogFacade"] = mockCatalogFacade

            await expect(placeOrderUseCase["getProduct"]("0")).resolves.toEqual(
                new Product({
                    id: new Id("0"),
                    name: "P0",
                    description: "D0",
                    salesPrice: 10
                })
            )
            
            expect(mockCatalogFacade.find).toHaveBeenCalledTimes(1)
        })
    })

    describe("execute method", () => {
        beforeAll(() => {
            jest.useFakeTimers()
            jest.setSystemTime(mockDate)
        })

        afterAll(() => {
            jest.useRealTimers()
        })
        
        it("should throw an error when client not found", async ()=> {
            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(null),
            }
            //ignorar erro de no params no constructor
            //@ts-expect-error - no params in constructor
            const placeOrderUseCase = new PlaceOrderUseCase()

            //@ts-expect-error - force set clientFacade
            placeOrderUseCase["_clientFacade"] = mockClientFacade;

            const input: InputPlaceOrderDto = {
                clientId: "0",
                products: []
            }

            await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
                new Error("Client not found")
            )
        })

        it("should throw an error when product is invalid", async () => {
            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(true),
            }

            //ignorar erro de no params no constructor
            //@ts-expect-error - no params in constructor
            const placeOrderUseCase = new PlaceOrderUseCase()

            const mockValidateProducts = jest
                //@ts-expect-error - spy on private method
                .spyOn(placeOrderUseCase, "validateProducts")
                //@ts-expect-error - not return never
                .mockRejectedValue(new Error("No products selected"));

            //@ts-expect-error - force set clientFacade
            placeOrderUseCase["_clientFacade"] = mockClientFacade;

            const input: InputPlaceOrderDto = {
                clientId: "1",
                products: []
            }

            await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
                new Error("No products selected")
            )
            expect(mockValidateProducts).toHaveBeenCalledTimes(1)
                
        })

        describe("place an order", () => {
            const clientProps = {
                id: "1",
                name: "C1",
                document: "D1",
                email: "E1",
                address: "A1",
                street: "S1",
                number: 1,
                city: "Ci1",
                state: "St1",
                zip: "Z1",
            }
            const mockClientFacade = {
                add: jest.fn(),
                find: jest.fn().mockResolvedValue(clientProps)
            };
            const mockPaymentFacacde = {
                process: jest.fn()
            }
            const mockCheckoutRepository = {
                findOrder: jest.fn(),
                addOrder: jest.fn()
            }
            const mockInvoiceFacade = {
                generate: jest.fn().mockResolvedValue({id: "1i"}),
                find: jest.fn()
            }
            const placeOrderUseCase = new PlaceOrderUseCase(
                mockClientFacade,
                null,
                null,
                mockCheckoutRepository,
                mockInvoiceFacade,
                mockPaymentFacacde
            )
            const products = {
                "1": new Product({
                    id: new Id("1"),
                    name: "P1",
                    description: "D1",
                    salesPrice: 10
                }),
                "2": new Product({
                    id: new Id("2"),
                    name: "P2",
                    description: "D2",
                    salesPrice: 10
                })
            }
            const mockValaidateProducts = jest
                //@ts-expect-error - spy on private methode
                .spyOn(placeOrderUseCase, "validateProducts")
                //@ts-expect-error - spy on private methode
                .mockResolvedValue(null)

                const mockGetProduct = jest
                //@ts-expect-error - spy on private methode
                .spyOn(placeOrderUseCase, "getProduct")
                //@ts-expect-error - spy on private methode
                .mockImplementation((productId: keyof typeof products) => {
                    return products[productId]
                })
            it("should not be approved", async () => {
                mockPaymentFacacde.process = mockPaymentFacacde.process.mockReturnValue({
                    transactionId: "T1",
                    orderId: "1",
                    amount: 10,
                    status: "error",
                    createdAt: new Date(),
                    updatedAt: new Date()
                })

                const input: InputPlaceOrderDto = {
                    clientId: "1",
                    products: [{productId:"1"}, {productId:"2"}]
                }
    
                const output = await placeOrderUseCase.execute(input)

                //expect(output.invoiceId).toBeNull()
                expect(output.total).toBe(20)
                expect(output.products).toStrictEqual([{productId:"1"},{productId: "2"}])
                expect(mockClientFacade.find).toHaveBeenCalledTimes(1)
                expect(mockClientFacade.find).toHaveBeenCalledWith({id: "1"})
                expect(mockValaidateProducts).toHaveBeenCalledTimes(1)
                expect(mockGetProduct).toHaveBeenCalledTimes(2)
                expect(mockCheckoutRepository.addOrder).toHaveBeenCalledTimes(1)
            })

            it("should be approved", async () => {
                mockPaymentFacacde.process = mockPaymentFacacde.process.mockReturnValue({
                    transactionId: "T1",
                    orderId: "1",
                    amount: 10,
                    status: "error",
                    createdAt: new Date(),
                    updatedAt: new Date()
                })

                const input: InputPlaceOrderDto = {
                    clientId: "1",
                    products: [{productId:"1"}, {productId:"2"}]
                }
                const output = await placeOrderUseCase.execute(input)

                expect(mockCheckoutRepository.addOrder).toHaveBeenCalledTimes(1)
            })
        })

    })

})