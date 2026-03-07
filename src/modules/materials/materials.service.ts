import { Injectable } from '@nestjs/common';
import { Material } from './materials.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class MaterialsService {

  constructor(
    @InjectModel(Material)
    private materialRespository: typeof Material,
  ) { }


  async findAllMaterials(): Promise<Material[]> {
    return await this.materialRespository.findAll({
      limit: 10,
      order: [['id_material', 'DESC']],
    });
  }

}
