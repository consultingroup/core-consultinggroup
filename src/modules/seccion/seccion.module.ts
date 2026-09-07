import { Module } from '@nestjs/common';
import { SeccionService } from './seccion.service';
import { SeccionController } from './seccion.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Section } from './section.model';

@Module({
   imports: [
        SequelizeModule.forFeature([Section])
      ],
  controllers: [SeccionController],
  providers: [SeccionService],
})
export class SeccionModule {}
