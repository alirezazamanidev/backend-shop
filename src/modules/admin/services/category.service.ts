import { ConflictException, Inject, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/modules/category/entities';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ConflictMessage, PublicMessage } from 'src/common/enums';
import slugify from 'slugify';

@Injectable({ scope: Scope.REQUEST })
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepo: Repository<CategoryEntity>,
    @Inject(REQUEST) private request: Request,
  ) {}

  async create(CreateCategoryDto: CreateCategoryDto) {
    let { name, slug } = CreateCategoryDto;

    slug = slug
      ? slug
      : slugify(name, { replacement: '_', trim: true, lower: true });

    slug = await this.checkExistBySlug(slug);

    const newCategory = this.categoryRepo.create({ name, slug });
    await this.categoryRepo.save(newCategory);
    return {
      message: PublicMessage.Created,
    };
  }
  private async checkExistBySlug(slug: string) {
 
    const category = await this.categoryRepo.findOneBy({ slug });
    if (category) throw new ConflictException(ConflictMessage.Slug);
    return slug
  }
}
