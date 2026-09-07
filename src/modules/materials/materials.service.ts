import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Material } from './materials.model';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectModel(Material)
    private materialRepository: typeof Material,
  ) {}

  async findAllMaterials(
    page = 1,
    limit = 10,
    search?: string,
  ) {
    const offset = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.nombre = {
        [Op.like]: `%${search}%`,
      };
    }

    return this.materialRepository.findAndCountAll({
      where,
      limit,
      offset,
      order: [['id_material', 'DESC']],
    });
  }
}