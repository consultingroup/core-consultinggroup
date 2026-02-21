import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sendGridMail from '@sendgrid/mail';
import * as fs from 'fs';
import * as path from 'path';
import { VerificationDto } from './dto/verification.dto';
import type { Multer } from 'multer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('SENDGRID_API_KEY');
    if (!apiKey) {
      throw new Error('Falta la variable de entorno SENDGRID_API_KEY');
    }
    sendGridMail.setApiKey(apiKey);
  }

  // Reemplaza {{variable}} en el template HTML con los valores reales
  private replaceTemplateVariables(
    template: string,
    data: Record<string, string>,
  ): string {
    return Object.entries(data).reduce((result, [key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      return result.replace(regex, value ?? '—'); // Si no hay valor, pone un guion
    }, template);
  }

  async sendClaimsBook(
    data: VerificationDto,
    evidencia?: Multer.File, // El archivo viene del controller, es opcional
  ): Promise<boolean> {
    const templatePath = path.join(
      __dirname,
      'templates',
      'claims-book.html',
    );
    this.logger.log(`Template path: ${templatePath}`);
    const htmlTemplate = fs.readFileSync(templatePath, 'utf8');

    // Reemplaza todas las variables del template con los datos del formulario
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

    const finalHtml = this.replaceTemplateVariables(htmlTemplate, replacements);

    // Arma el mensaje base
    const msg: sendGridMail.MailDataRequired = {
      to: 'obregonjefferson2@gmail.com',
      from: 'info@consultinggroup.com.pe',
      replyTo: data.email,
      subject: `[${data.tipoRegistro}] Libro de Reclamaciones - ${data.nombres} ${data.apellidos}`,
      html: finalHtml,
    };
    if (evidencia) {
      msg.attachments = [
        {
          content: evidencia.buffer.toString('base64'), // SendGrid necesita base64
          filename: evidencia.originalname,
          type: evidencia.mimetype,
          disposition: 'attachment',
        },
      ];
    }

    try {
      await sendGridMail.send(msg);
      this.logger.log(`Correo de reclamaciones enviado por ${data.email}`);
      return true;
    } catch (error) {
      this.logger.error('Error al enviar el correo de reclamación', error);
      throw new InternalServerErrorException('Error al enviar el correo');
    }
  }
}
