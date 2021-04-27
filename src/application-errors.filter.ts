import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  RpcExceptionFilter,
} from '@nestjs/common';
import { ApplicationError } from './application.error';
import { Response } from 'express';
import { Observable, throwError } from 'rxjs';

@Catch(ApplicationError)
export class ApplicationErrorsFilter
  implements ExceptionFilter, RpcExceptionFilter<ApplicationError> {
  constructor(private codes: { [key: string]: number }) {}

  catch(exception: ApplicationError, host: ArgumentsHost): Observable<any> {
    const error = this.getErrorObject(exception);
    if (host.getType() === 'http') {
      const ctx = host.switchToHttp();
      const response: Response = ctx.getResponse<Response>();
      response.status(error.statusCode).json(error);
      return new Observable<any>();
    } else if (host.getType() === 'rpc') {
      return throwError(error);
    }
  }

  getErrorObject(exception: ApplicationError) {
    return { statusCode: this.codes[exception.code], message: exception.code };
  }
}
