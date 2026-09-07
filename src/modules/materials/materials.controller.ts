import { Controller, Get, Query } from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Materiales')
@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener materiales' })

  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
    description: 'Número de página',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
    description: 'Cantidad de registros',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    example: 'javascript',
    description: 'Buscar por nombre',
  })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search?: string,
  ) {
    return this.materialsService.findAllMaterials(
      Number(page),
      Number(limit),
      search,
    );
  }
}