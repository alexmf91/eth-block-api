import { Router } from "express"
import { getClosestBlockNumber } from "../controllers"

const blockNumberRouter = Router()

blockNumberRouter.route("/block-number/:timestamp").get(getClosestBlockNumber)

export { blockNumberRouter }
