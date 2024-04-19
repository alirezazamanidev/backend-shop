import { BaseEntity } from "src/common/abstracts";
import { Column, Entity, ManyToOne } from "typeorm";
import { ProductEntity } from "./product.entity";
import { CategoryEntity } from "src/modules/category/entities";
import { EntityName } from "src/common/enums";

@Entity(EntityName.ProductCategory)
export class ProductCategoryEntity extends BaseEntity {
    @Column()
    productId:number
    @Column()
    categoryId:number
    @ManyToOne(()=>ProductEntity,product=>product.categories,{onDelete:'CASCADE'})
    product:ProductEntity
    @ManyToOne(()=>CategoryEntity,category=>category.product_categories,{onDelete:'CASCADE'})
    category:CategoryEntity
}