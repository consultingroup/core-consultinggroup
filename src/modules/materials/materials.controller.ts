import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Materiales')
@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) { }


  @Get()
  @ApiOperation({ summary: 'Obtener todos los materiales' })
  async findAll() {
    return await this.materialsService.findAllMaterials();
  }
}
