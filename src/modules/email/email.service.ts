import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import * as fs from 'fs';
import * as path from 'path';
import type { Multer } from 'multer';
import { VerificationDto } from './dto/verification.dto'; // <-- Ajusta la ruta según donde tengas tu DTO

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private resend: Resend;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('SENDGRID_API_KEY');
    if (!apiKey) {
      throw new Error('Falta la variable de entorno SENDGRID_API_KEY');
    }
    this.resend = new Resend(apiKey);
  }

  private replaceTemplateVariables(
    template: string,
    data: Record<string, string>,
  ): string {
    return Object.entries(data).reduce((result, [key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      return result.replace(regex, value ?? '—');
    }, template);
  }

  async sendClaimsBook(
    data: VerificationDto,
    evidencia?: Multer.File,
  ): Promise<boolean> {
    const templatePath = path.join(
      __dirname,
      'templates',
      'claims-book.html',
    );
    this.logger.log(`Template path: ${templatePath}`);
    const htmlTemplate = fs.readFileSync(templatePath, 'utf8');

    const replacements: Record<string, string> = {
      tipoDocumento: data.tipoDocumento,
      numeroDocumento: data.numeroDocumento,
      nombres: data.nombres,
      apellidos: data.apellidos,
      email: data.email,
      telefono: data.telefono,
      servicio: data.servicio,
      fechaContratacion: data.fechaContratacion ?? 'No especificada',
      monto: data.monto ?? 'No especificado',
      medioPago: data.medioPago ?? 'No especificado',
      tipoClasificacion: data.tipoClasificacion ?? 'No especificada',
      tipoRegistro: data.tipoRegistro,
      region: data.region,
      provincia: data.provincia,
      distrito: data.distrito,
      descripcion: data.descripcion,
      pedido: data.pedido,
    };

    const finalHtml = this.replaceTemplateVariables(
      htmlTemplate,
      replacements,
    );

    // Resend recibe los archivos adjuntos directamente como Buffer o Base64
    const attachments = evidencia
      ? [
          {
            filename: evidencia.originalname,
            content: evidencia.buffer,
          },
        ]
      : undefined;

    try {
      const response = await this.resend.emails.send({
        from: 'administracion@consultinggroup.com.pe', // Cambia a 'info@consultinggroup.com.pe' cuando verifiques el dominio
        to: 'obregonjefferson2@gmail.com',
        replyTo: data.email,
        subject: `[${data.tipoRegistro}] Libro de Reclamaciones - ${data.nombres} ${data.apellidos}`,
        html: finalHtml,
        attachments,
      });

      if (response.error) {
        this.logger.error('Error de Resend API:', response.error);
        throw new InternalServerErrorException('Error al enviar el correo');
      }

      this.logger.log(`Correo de reclamaciones enviado por ${data.email}`);
      return true;
    } catch (error) {
      this.logger.error('Error al enviar el correo de reclamación', error);
      throw new InternalServerErrorException('Error al enviar el correo');
    }
  }
}