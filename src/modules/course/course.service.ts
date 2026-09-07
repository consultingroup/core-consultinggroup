import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Course } from './course.model';
import { Section } from '../seccion/section.model';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course)
    private courseRepository: typeof Course,
  ) {}

  async findAllCourses() {
    return this.courseRepository.findAll({
      attributes: [
        'id_curso',
        'nombre',
        'description',
        'duracion',
        'imagen',
        'id_profesor',
      ],
      order: [['id_curso', 'DESC']],
    });
  }

  async findCourseById(id: number) {
    const course = await this.courseRepository.findOne({
      where: {
        id_curso: id,
      },
      include: [
        {
          model: Section,
          required: false,
        },
      ],
    });

    if (!course) {
      throw new NotFoundException('Curso no encontrado');
    }

    return course;
  }
}