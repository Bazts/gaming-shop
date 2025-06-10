export class ErrorHandler extends Error {
  statusCode: number
  details: object | null

  constructor (
    statusCode: number = 500,
    message: string = 'Internal Server Error',
    details: object | null = null
  ) {
    super()

    this.statusCode = statusCode
    this.message = message
    this.details = details
  }
}