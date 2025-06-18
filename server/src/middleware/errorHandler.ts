import { NextFunction, Request, Response } from "express";
import HttpError from "../util/HttpError";
import httpStatus from "../constants/httpStatus";

const formattedErrorLog = (error: HttpError, req: Request, res: Response) => {
  return {
    errorName: error.name,
    errorMessage: error.message,
    errorStack: error.stack,
    request: {
      method: req.method,
      url: req.url,
      origin: req.headers.origin,
      host: req.headers.host,
      clientIp: req?.headers['x-forwarded-for'] || req.socket.remoteAddress,
    },
    response: {
      header: res.getHeaders(),
      statusCode: res.statusCode
    }
  }
}


const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error)

  if (error.name === 'TokenExpiredError') {
    error.statusCode = httpStatus.UNAUTHORIZED
  }

  let resJson: any = {}
  let statusCode = httpStatus.INTERNAL_SERVER_ERROR

  if (error instanceof HttpError) {
    statusCode = error.statusCode
    resJson = {
      status: error.status,
      name: error.name,
      message: error.message
    }
  } else if (error instanceof Error) {
    resJson = {
      status: 'error',
      name: error.name,
      message: error.message
    }
  }

  res.status(statusCode).json(resJson)
  const logData = formattedErrorLog(error, req, res)
  const jsonString = JSON.stringify(logData)
  console.log('\x1b[31m%s\x1b[0m', jsonString)
}

export default errorHandler