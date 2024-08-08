import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { Recipe } from './recipe';

@Table({
    tableName: 'DailyMealPlans',
    timestamps: false
  })
export class DailyMealPlan extends Model {
  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  date!: string;

  @ForeignKey(() => Recipe)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  breakfastId!: number;

  @BelongsTo(() => Recipe, 'breakfastId')
  breakfast!: Recipe;

  @ForeignKey(() => Recipe)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  lunchId!: number;

  @BelongsTo(() => Recipe, 'lunchId')
  lunch!: Recipe;

  @ForeignKey(() => Recipe)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  dinnerId!: number;

  @BelongsTo(() => Recipe, 'dinnerId')
  dinner!: Recipe;
}
