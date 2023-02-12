import type { Request, Response, NextFunction } from "express"
import { logger } from "../utils"

export const httpLoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`[HTTP] - { "method":"${req.method}", "path":"${req.path}" }`)
  next()
}
