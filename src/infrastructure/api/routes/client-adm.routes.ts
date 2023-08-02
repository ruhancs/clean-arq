import express, {Request, Response} from "express";
import FacadeFactory from "../../../modules/client-adm/factory/facade.factory";
import { InputAddClientDto } from "../../../modules/client-adm/usecase/add-client/add-client-usecase.dto";


export const clientRoutes = express.Router()

clientRoutes.post("/", async(req: Request, res: Response) => {
    const usecase = FacadeFactory.create()
    try {
        const clientDto: InputAddClientDto = {
            name: req.body.name,
            email: req.body.email,
            address: req.body.address
        }
        const output = await usecase.add(clientDto)
        res.send(output)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})