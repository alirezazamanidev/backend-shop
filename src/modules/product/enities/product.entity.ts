import { BaseEntity } from 'src/common/abstracts';
import { EntityName } from 'src/common/enums';
import { UserEntity } from 'src/modules/user/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { ProductCategoryEntity } from './product-category.entity';

@Entity(EntityName.Product)
export class ProductEntity extends BaseEntity {
  @Column({ unique: true })
  title: string;
  @Column({ unique: true })
  slug: string;
  @Column({ type: 'text' })
  content: string;
  @Column()
  price: string;
  @Column()
  count: string;
  @Column({ default: 0 })
  disCount: number;
  @Column()
  supplearId: number;
  @ManyToOne(() => UserEntity, (user) => user.products, { onDelete: 'CASCADE' })
  supplear: UserEntity;

  @OneToMany(()=>ProductCategoryEntity,category=>category.product)
  categories:ProductCategoryEntity[]
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
