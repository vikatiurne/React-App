import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task)
    private taskModel: typeof Task,
  ) {}

  create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new Task();

    task.title = createTaskDto.title;
    task.text = createTaskDto.text;

    return task.save();
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.findAll();
  }

  findOne(id: string): Promise<Task> {
    return this.taskModel.findOne({ where: { id } });
  }

  update(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<[affectedCount: number, affectedRows: Task[]]> {
    return this.taskModel.update(
      { ...updateTaskDto },
      { where: { id }, returning: true },
    );
  }

  async remove(id: string): Promise<void> {
    const task = await this.findOne(id);
    await task.destroy();
  }
}
