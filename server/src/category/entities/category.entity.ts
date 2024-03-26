import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Task } from '../../tasks/entities/task.entity';

@Table({ tableName: 'CATEGORY' })
export class Category extends Model<Category> {
  @Column({ field: 'NAME', onDelete: 'CASCADE' })
  name: string;

  @HasMany(() => Task, 'categoryId')
  task: Task[];
}
