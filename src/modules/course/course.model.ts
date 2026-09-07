import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  HasMany,
} from 'sequelize-typescript';
import { Section } from '../seccion/section.model';

@Table({
  tableName: 'curso',
  timestamps: false,
})
export class Course extends Model<Course> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id_curso: number;

  @Column(DataType.TEXT)
  nombre: string;

  @Column(DataType.TEXT)
  description: string;

  @Column(DataType.TEXT)
  duracion: string;

  @Column(DataType.TEXT)
  imagen: string;

  @Column(DataType.INTEGER)
  id_profesor: number;

  @HasMany(() => Section, {
    foreignKey: 'id_curso',
    sourceKey: 'id_curso',
  })
  secciones: Section[];
}