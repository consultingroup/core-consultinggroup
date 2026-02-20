import { BadRequestException } from "@nestjs/common";

export class CustomBadRequestException extends BadRequestException {
  constructor(message: string, errors?: any) {
    super({
      statusCode: 400,
      message,
      errors: errors || null,
      data: null,
      meta: null,
    });
  }
}
