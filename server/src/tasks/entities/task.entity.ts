import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from '../../category/entities/category.entity';

@Table
export class Task extends Model<Task> {
  @Column({ field: 'NAME' })
  title: string;

  @Column({ field: 'TEXT' })
  text: string;

  @Column({ field: 'CATEGORY_ID' })
  categoryId: number;

  @ForeignKey(() => Category)
  @BelongsTo(() => Category, 'taskId')
  category: Category;
}
