import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category)
    private categoryModel: typeof Category,
  ) {}

  create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = new Category();

    category.name = createCategoryDto.name;

    return category.save();
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.findAll();
  }

  findOne(id: string): Promise<Category> {
    return this.categoryModel.findOne({ where: { id } });
  }

  update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<[affectedCount: number, affectedRows: Category[]]> {
    return this.categoryModel.update(
      { ...updateCategoryDto },
      { where: { id }, returning: true },
    );
  }

  async remove(id: string): Promise<void> {
    const category = await this.findOne(id);
    await category.destroy();
  }
}
