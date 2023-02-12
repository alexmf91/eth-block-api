import { ethers } from "ethers"
import { logger } from "../utils"

const RPC_URL = process.env.RPC_URL

let ethersProvider: ethers.providers.JsonRpcProvider

try {
  ethersProvider = new ethers.providers.JsonRpcProvider(RPC_URL)
} catch (error: unknown) {
  logger.error(
    `Error creating JSON-RPC provider: ${error instanceof Error ? error.message : error}`
  )
  process.exit(1)
}

export { ethersProvider }
