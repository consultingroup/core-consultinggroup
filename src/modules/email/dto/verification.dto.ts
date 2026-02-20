import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class VerificationDto {
    @ApiProperty({ example: "Juan Pérez", description: "Nombre completo del usuario" })
    nombre: string;

    @ApiProperty({ example: "Consultor", description: "Puesto del usuario" })
    empresa: string;

    @ApiProperty({ example: "Desarrollador Backend", description: "Puesto del usuario" })
    puesto: string;

    @ApiProperty({ example: "obregonjefferson2@gmail.com", description: "Correo electrónico del usuario" })
    @IsNotEmpty({ message: "El correo electrónico es obligatorio" })
    @IsEmail({}, { message: "El correo electrónico no es válido" })
    email: string;
} 