import type { Config } from "jest"

const config: Config = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  clearMocks: true,
  coverageDirectory: "coverage",
}

export default config
