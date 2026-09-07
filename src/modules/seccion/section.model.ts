import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Course } from '../course/course.model';

@Table({
  tableName: 'seccion',
  timestamps: false,
})
export class Section extends Model<Section> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id_seccion: number;

  @ForeignKey(() => Course)
  @Column(DataType.INTEGER)
  id_curso: number;

  @Column(DataType.TEXT)
  nombre: string;

  @BelongsTo(() => Course, {
    foreignKey: 'id_curso',
    targetKey: 'id_curso',
  })
  curso: Course;
}