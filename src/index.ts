import express from "express"
import swaggerUi from "swagger-ui-express"
import swaggerDocument from "./docs/swagger.json"
import { httpLoggerMiddleware } from "./middlewares"
import { blockNumberRouter } from "./routers"
import { logger } from "./utils"

const server = express()
const port = process.env.PORT || 9000
const version = process.env.API_VERSION || "v1"
const apiPrefix = `/api/${version}`
const appName = process.env.APP_NAME || "Server"

/* Middlewares */
server.use(express.json())
server.use(httpLoggerMiddleware)
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

/* Routers */
server.use(apiPrefix, blockNumberRouter)

/* Start server */
server.listen(port, () => {
  logger.info(`${appName} is running on: 🚀🚀🚀 http://localhost:${port}${apiPrefix} 🚀🚀🚀`)
  logger.info(`Api docs are available on: 📜 http://localhost:${port}/api-docs 📜`)
})
