import {
    Injectable,
    Logger,
    InternalServerErrorException,
} from "@nestjs/common";
import * as sendGridMail from "@sendgrid/mail";
import { ConfigService } from "@nestjs/config";
import * as fs from "fs";
import * as path from "path";
import { VerificationDto } from "./dto/verification.dto";

@Injectable()
export class EmailService {
    private readonly logger = new Logger(EmailService.name);

    constructor(private configService: ConfigService) {
        const apiKey = this.configService.get<string>("SENDGRID_API_KEY");
        if (!apiKey) {
            throw new Error("Falta la variable de entorno SENDGRID_API_KEY");
        }
        sendGridMail.setApiKey(apiKey);
    }

    replaceTemplateVariables(template: string, data: Record<string, string>): string {
        return Object.entries(data).reduce((result, [key, value]) => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            return result.replace(regex, value);
        }, template);
    }

    async sendClaimsBook(data: VerificationDto): Promise<any> {
        const templatePath = path.join(process.cwd(), "src/modules/email/templates/verification-code.html");

        const htmlTemplate = fs.readFileSync(templatePath, "utf8")


        const replacements = {
            Nombre: data.nombre,
            Empresa: data.empresa,
            Puesto: data.puesto
        }
        const finalHtml = this.replaceTemplateVariables(htmlTemplate, replacements)

        const msg = {
            to: "obregonjefferson2@gmail.com",
            from: "info@empleoservicio.com",
            replyTo: data.email,
            subject: "Libro de Reclamaciones - Verificar Información",
            html: finalHtml,
        };

        try {
            await sendGridMail.send(msg);
            return true;
        } catch (error) {
            this.logger.error("Error al enviar el correo", error);
            throw new InternalServerErrorException("Error al enviar el correo", error);
        }
    }
}
