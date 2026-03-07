import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from
    'sequelize-typescript';

@Table({
    tableName: 'material',
    timestamps: false,
})
export class Material extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.NUMBER)
    id_material: number;

    @Column(DataType.NUMBER)
    id_seccion: number;

    @Column(DataType.TEXT)
    nombre: string;

    @Column(DataType.TEXT)
    tipo: string;

    @Column(DataType.TEXT)
    url: string;
}
