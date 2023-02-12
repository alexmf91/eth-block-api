import { createLogger, format, Logger, LoggerOptions, transports } from "winston"

interface LogLevel {
  color: string
  label: string
}

const logLevels: { [key: string]: LogLevel } = {
  error: { color: "\x1b[31m", label: "[ERROR]" },
  warn: { color: "\x1b[33m", label: "[WARN]" },
  info: { color: "\x1b[32m", label: "[INFO]" },
  verbose: { color: "\x1b[34m", label: "[VERBOSE]" },
  debug: { color: "\x1b[36m", label: "[DEBUG]" },
}

const customFormat = format.printf((info) => {
  const level = logLevels[info.level]
  return `${level.color}[${info.label}]\x1b[0m ${info.timestamp} ${level.color}${level.label}\x1b[0m ${info.message}`
})

const loggerOptions: LoggerOptions = {
  format: format.combine(
    format.label({ label: process.env.APP_NAME }),
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    customFormat
  ),
  transports: [new transports.Console()],
}

export const logger: Logger = createLogger(loggerOptions)
