import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class VerificationDto {
  // ── Datos del consumidor ──────────────────────────────────
  @ApiProperty({
    example: 'DNI',
    description: 'Tipo de documento de identidad',
  })
  @IsNotEmpty({ message: 'El tipo de documento es obligatorio' })
  @IsIn(['DNI', 'CE', 'PASAPORTE'], { message: 'Tipo de documento no válido' })
  tipoDocumento: string;

  @ApiProperty({ example: '12345678', description: 'Número de documento' })
  @IsNotEmpty({ message: 'El número de documento es obligatorio' })
  numeroDocumento: string;

  @ApiProperty({ example: 'Juan', description: 'Nombres del consumidor' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombres: string;

  @ApiProperty({
    example: 'Pérez García',
    description: 'Apellidos del consumidor',
  })
  @IsNotEmpty({ message: 'Los apellidos son obligatorios' })
  apellidos: string;

  @ApiProperty({
    example: 'juan@correo.com',
    description: 'Correo electrónico',
  })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email: string;

  @ApiProperty({ example: '987654321', description: 'Teléfono de contacto' })
  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  telefono: string;

  // ── Datos del servicio ────────────────────────────────────
  @ApiProperty({
    example: 'Curso de Excel Avanzado',
    description: 'Nombre del curso o servicio',
  })
  @IsNotEmpty({ message: 'El nombre del servicio es obligatorio' })
  servicio: string;

  @ApiPropertyOptional({
    example: '2024-01-15',
    description: 'Fecha de contratación',
  })
  @IsOptional()
  fechaContratacion?: string;

  @ApiPropertyOptional({ example: '350', description: 'Monto pagado' })
  @IsOptional()
  monto?: string;

  @ApiPropertyOptional({
    example: 'Yape',
    description: 'Medio de pago utilizado',
  })
  @IsOptional()
  medioPago?: string;

  @ApiPropertyOptional({
    example: 'curso',
    description: 'Clasificación del servicio',
  })
  @IsOptional()
  tipoClasificacion?: string;

  // ── Tipo de registro ──────────────────────────────────────
  @ApiProperty({
    example: 'RECLAMO',
    description: 'Tipo de registro: QUEJA o RECLAMO',
  })
  @IsNotEmpty({ message: 'El tipo de registro es obligatorio' })
  @IsIn(['QUEJA', 'RECLAMO'], {
    message: 'El tipo de registro debe ser QUEJA o RECLAMO',
  })
  tipoRegistro: string;

  // ── Ubicación ─────────────────────────────────────────────
  @ApiProperty({ example: 'Lima', description: 'Región del consumidor' })
  @IsNotEmpty({ message: 'La región es obligatoria' })
  region: string;

  @ApiProperty({ example: 'Lima', description: 'Provincia del consumidor' })
  @IsNotEmpty({ message: 'La provincia es obligatoria' })
  provincia: string;

  @ApiProperty({
    example: 'Miraflores',
    description: 'Distrito del consumidor',
  })
  @IsNotEmpty({ message: 'El distrito es obligatorio' })
  distrito: string;

  // ── Detalle ───────────────────────────────────────────────
  @ApiProperty({
    example: 'El curso no cumplió con lo ofertado...',
    description: 'Descripción del hecho',
  })
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  descripcion: string;

  @ApiProperty({
    example: 'Solicito la devolución del monto pagado.',
    description: 'Pedido concreto',
  })
  @IsNotEmpty({ message: 'El pedido es obligatorio' })
  pedido: string;
}
