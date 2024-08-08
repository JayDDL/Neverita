import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'MealPlans',
  timestamps: false
})

export class MealPlan extends Model<MealPlan> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description!: string;
}
