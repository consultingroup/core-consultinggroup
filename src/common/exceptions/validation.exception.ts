import { BadRequestException } from '@nestjs/common';

export class ValidationException extends BadRequestException {
  constructor(public validationErrors: string[]) {
    super({
      statusCode: 400,
      message: 'Validation failed',
      errors: validationErrors,
    });
  }
}
