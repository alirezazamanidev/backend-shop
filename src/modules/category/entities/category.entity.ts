import { BaseEntity } from 'src/common/abstracts';
import { EntityName } from 'src/common/enums';
import { ProductCategoryEntity } from 'src/modules/product/enities/product-category.entity';
import { Column, CreateDateColumn, Entity, OneToMany, UpdateDateColumn } from 'typeorm';

@Entity(EntityName.Category)
export class CategoryEntity extends BaseEntity {
  @Column({ unique: true })
  name: string;
  @Column({ unique: true })
  slug: string;
  @OneToMany(()=>ProductCategoryEntity,product=>product.category)
  product_categories:ProductCategoryEntity[]
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
