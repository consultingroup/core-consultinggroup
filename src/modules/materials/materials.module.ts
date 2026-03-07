import { Module } from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { MaterialsController } from './materials.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Material } from './materials.model';

@Module({
  imports: [SequelizeModule.forFeature([Material])],
  controllers: [MaterialsController],
  providers: [MaterialsService],
})
export class MaterialsModule { }
