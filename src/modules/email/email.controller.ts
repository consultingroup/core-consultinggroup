import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { EmailService } from "./email.service";
import { VerificationDto } from "./dto/verification.dto";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Email")
@Controller("email")
export class EmailController {

    constructor(private emailService: EmailService) { }

    @Post("send")
    @ApiOperation({ summary: "Enviar correo de verificación" })
    @ApiBody({ type: VerificationDto, description: "Datos necesarios para enviar el correo de verificación" })
    async sendEmail(@Body() verificationDto: VerificationDto) {
        return await this.emailService.sendClaimsBook(verificationDto);

    }
}
