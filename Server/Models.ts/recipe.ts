import { Table, Column, Model, BelongsTo, ForeignKey, DataType } from 'sequelize-typescript';
import { User } from './User';

@Table({
    tableName: 'Users',
    timestamps: false
  })
export class Recipe extends Model<Recipe> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  ingredients!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  instructions!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}
