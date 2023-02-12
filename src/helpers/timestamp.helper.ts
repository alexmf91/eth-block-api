export function isValidTimestamp(timestamp: number): boolean {
  if (timestamp >= 0 && Number.isInteger(timestamp)) {
    const date = new Date(timestamp * 1000)

    return !isNaN(date.getTime())
  } else {
    return false
  }
}
