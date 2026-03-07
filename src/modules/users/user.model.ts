import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, Default, ForeignKey, BelongsTo, HasMany } from
    'sequelize-typescript';

@Table({
    tableName: 'usuario',
    timestamps: false,
})
export class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ field: 'id_usuario' })
    id: number;

    @Column(DataType.TEXT)
    tipoUser: string;

    @Column(DataType.TEXT)
    usuario: string;

    @Column({ type: DataType.BOOLEAN })
    contrasena: boolean;
}
