import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'WeeklyMealPlans',
    timestamps: false
  })
export class WeeklyMealPlan extends Model{
  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  weekStartDate!: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  weekEndDate!: string;

  @Column(DataType.JSON)
  monday!: any;

  @Column(DataType.JSON)
  tuesday!: any;

  @Column(DataType.JSON)
  wednesday!: any;

  @Column(DataType.JSON)
  thursday!: any;

  @Column(DataType.JSON)
  friday!: any;

  @Column(DataType.JSON)
  saturday!: any;

  @Column(DataType.JSON)
  sunday!: any;
}
