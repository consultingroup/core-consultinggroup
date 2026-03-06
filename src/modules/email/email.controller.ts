import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Get,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { VerificationDto } from './dto/verification.dto';
import {
  ApiBody,
  ApiOperation,
  ApiTags,
  ApiConsumes,
  ApiResponse,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Multer } from 'multer';
import { Logger } from '@nestjs/common';

@ApiTags('Email')
@Controller('email')

export class EmailController {
  private readonly logger = new Logger(EmailController.name);
  constructor(private emailService: EmailService) {}

  @Post('send')
  @ApiOperation({ summary: 'Enviar correo libro de reclamaciones' })
  // Le decimos a Swagger que este endpoint recibe multipart/form-data (para el archivo)
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: VerificationDto })
  @ApiResponse({
    status: 201,
    description: 'Correo enviado exitosamente.',
    example: {
      statusCode: 201,
      message: 'Success',
      data: true,
      errors: null,
      meta: null,
    },
  })
  // FileInterceptor intercepta el campo "evidencia" del FormData
  @UseInterceptors(FileInterceptor('evidencia'))
  async sendEmail(
    @Body() verificationDto: VerificationDto,
    @UploadedFile() evidencia?: Multer.File, // El archivo es opcional
  ) {
    return await this.emailService.sendClaimsBook(verificationDto, evidencia);
  }

  @Get('test')
  @ApiOperation({ summary: 'Endpoint de prueba para verificar que el controlador funciona' })
  testEndpoint() {
    this.logger.log('Petición recibida en /email/test');
    return {
      statusCode: 200,
      message: 'Test endpoint is working',
      data: null,
      errors: null,
      meta: null,
    };
  }
}
