import { NextFunction, Request, Response } from "express";


const formatHttpLoggerResponse = (req: Request, res: Response, responseMessage?: string) => {
  const formattedData = {
    request: {
      method: req.method,
      url: `${req.baseUrl}${req.url}`,
      origin: req.headers.origin,
      host: req.headers.host,
      clientIp: req?.headers['x-forwarded-for'] || req.socket.remoteAddress
    },
    response: {
      headers: res.getHeaders(),
      statusCode: res.statusCode,
      responseMessage: responseMessage
    }
  }
  return formattedData
}


const httpLogger = (req: Request, res: Response, next: NextFunction) => {
  const logData = formatHttpLoggerResponse(req, res)
  const jsonString   = JSON.stringify(logData)
  console.log(`\x1b[32m${jsonString}\x1b[0m`)
  next()
}

export default httpLogger