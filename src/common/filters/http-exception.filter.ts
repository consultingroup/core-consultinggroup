import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : null;

    const message =
      exceptionResponse && typeof exceptionResponse === 'object'
        ? (exceptionResponse as any).message || exception.message
        : exception.message || 'Internal server error';

    const isObject =
      exceptionResponse !== null && typeof exceptionResponse === 'object';

    response.status(status).json({
      statusCode: status,
      message,
      errors: isObject ? (exceptionResponse as any).errors || null : null,
      data: isObject ? (exceptionResponse as any).data || null : null,
      meta: isObject ? (exceptionResponse as any).meta || null : null,
    });
  }
}
