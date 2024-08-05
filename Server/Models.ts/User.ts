import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript';
import { Recipe } from './recipe';

@Table({
    tableName: 'Users',
    timestamps: false
  })
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @HasMany(() => Recipe)
  recipes!: Recipe[];
}
