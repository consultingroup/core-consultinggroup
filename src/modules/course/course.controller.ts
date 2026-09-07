import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CourseService } from './course.service';

@ApiTags('Cursos')
@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los cursos' })
  async findAll() {
    return this.courseService.findAllCourses();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un curso con sus secciones' })
  async findOne(@Param('id') id: number) {
    return this.courseService.findCourseById(Number(id));
  }
}