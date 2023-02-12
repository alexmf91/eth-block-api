import type { Request, Response } from "express"
import { ethersProvider } from "../../libs/ethers"
import { getClosestBlockNumber } from "../../controllers"
import { isValidTimestamp } from "../../helpers"

jest.mock("../../libs/ethers", () => {
  return {
    ethersProvider: {
      getBlockNumber: jest.fn(),
      getBlock: jest.fn().mockImplementation((blockNumber) => ({
        timestamp: blockNumber * 1000,
      })),
    },
  }
})

jest.mock("../../helpers", () => ({
  isValidTimestamp: jest.fn(),
}))

describe("getClosestBlockNumber", () => {
  let req: Request
  let res: Response

  beforeEach(() => {
    req = {
      params: {
        timestamp: "",
      },
    } as unknown as Request
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as unknown as Response

    jest.clearAllMocks()
  })

  it("should return 400 when an invalid timestamp is provided", async () => {
    // Arrange
    (isValidTimestamp as jest.MockedFunction<typeof isValidTimestamp>).mockReturnValueOnce(false)
    req.params.timestamp = "abc"
    // Act
    await getClosestBlockNumber(req, res)
    // Assert
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({ error: "Invalid timestamp provided" })
  })
  it("should return 500 and error message if there is an error", async () => {
    // Arrange
    (isValidTimestamp as jest.MockedFunction<typeof isValidTimestamp>).mockReturnValueOnce(true)
    req.params.timestamp = "55000"
    const errorMessage = "Test error"
    ;(ethersProvider.getBlockNumber as jest.Mock).mockRejectedValue(errorMessage)
    // Act
    await getClosestBlockNumber(req, res)
    // Assert
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({ error: errorMessage })
  })
  it("should return the closest block", async () => {
    // Arrange
    (isValidTimestamp as jest.MockedFunction<typeof isValidTimestamp>).mockReturnValueOnce(true)
    ;(ethersProvider.getBlockNumber as jest.Mock).mockResolvedValue(100)
    req.params.timestamp = "55000"
    // Act
    await getClosestBlockNumber(req, res)
    // Assert
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      blockNumber: 55,
      blockTimestamp: 55000,
    })
  })
})
