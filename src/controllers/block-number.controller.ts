import type { Request, Response } from "express"
import { ethersProvider } from "../libs/ethers"
import { isValidTimestamp } from "../helpers"

const blockTimestampsCache = new Map<number, number>()
const closestBlocksCache = new Map<number, { blockNumber: number; blockTimestamp: number }>()

export async function getClosestBlockNumber(req: Request, res: Response) {
  try {
    const requestedTimestamp = parseInt(req.params.timestamp, 10)

    if (!isValidTimestamp(requestedTimestamp)) {
      return res.status(400).send({ error: "Invalid timestamp provided" })
    }

    const cachedClosestBlock = closestBlocksCache.get(requestedTimestamp)

    if (cachedClosestBlock) {
      return res.status(200).send(cachedClosestBlock)
    }

    let upperBlockNumber = await ethersProvider.getBlockNumber()
    let lowerBlockNumber = 0
    let middleBlockNumber = Math.floor((lowerBlockNumber + upperBlockNumber) / 2)

    while (lowerBlockNumber < upperBlockNumber) {
      let middleBlockTimestamp = blockTimestampsCache.get(middleBlockNumber)
      if (!middleBlockTimestamp) {
        const middleBlock = await ethersProvider.getBlock(middleBlockNumber)
        middleBlockTimestamp = middleBlock.timestamp
        blockTimestampsCache.set(middleBlockNumber, middleBlockTimestamp)
      }

      const diff = middleBlockTimestamp - requestedTimestamp

      if (diff === 0) {
        const closestBlock = {
          blockNumber: middleBlockNumber,
          blockTimestamp: middleBlockTimestamp,
        }
        closestBlocksCache.set(requestedTimestamp, closestBlock)

        return res.status(200).send(closestBlock)
      } else if (diff > 0) {
        upperBlockNumber = middleBlockNumber - 1
      } else {
        lowerBlockNumber = middleBlockNumber + 1
      }

      middleBlockNumber = lowerBlockNumber + Math.floor((upperBlockNumber - lowerBlockNumber) / 2)
    }

    const block = await ethersProvider.getBlock(lowerBlockNumber)
    const closestBlock = {
      blockNumber: lowerBlockNumber,
      blockTimestamp: block.timestamp,
    }
    closestBlocksCache.set(requestedTimestamp, closestBlock)

    return res.status(200).send(closestBlock)
  } catch (error: unknown) {
    return res.status(500).send({ error: error instanceof Error ? error.message : error })
  }
}
