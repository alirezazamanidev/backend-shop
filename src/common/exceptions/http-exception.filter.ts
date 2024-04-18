import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const { message } =exception
    const ctx = host.switchToHttp();
    let status=exception.getStatus()

    const responseBody= {
      statusCode:status,
      timestamp: new Date().toISOString(),
      errors: {
        path: httpAdapter.getRequestUrl(ctx.getRequest()),
        message,
     
      },
    };
    
    httpAdapter.reply(ctx.getResponse(),responseBody,status);
  }
}
