import { Table, Column, Model, BelongsTo, ForeignKey, DataType } from 'sequelize-typescript';
import { User } from './User';

@Table({
    tableName: 'recipes',
    timestamps: false
  })
export class Recipe extends Model{
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.JSONB,
    allowNull: false,
  })
  ingredients!: object[];

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  instructions!: string;

//   @ForeignKey(() => User)
//   @Column({
//     type: DataType.INTEGER,
//     allowNull: true,
//   })
//   userId!: number;

//   @BelongsTo(() => User)
//   user!: User;
}
export interface RecipeCreationAttributes {
    title: string;
    ingredients: string;
    instructions: string;
    userId?: number | null;
  }
