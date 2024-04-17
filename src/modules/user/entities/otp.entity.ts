import { BaseEntity } from "src/common/abstracts";
import { Column, CreateDateColumn, Entity, OneToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { EntityName } from "src/common/enums";

@Entity(EntityName.Otp)
export class OtpEntity extends BaseEntity {

    @Column({length:5})
    code:string
    @Column()
    expiresIn:Date
    @Column()
    userId:number
    @OneToOne(()=>UserEntity,user=>user.otp,{
        onDelete:'CASCADE'
    })
    user:UserEntity
    @CreateDateColumn()
    created_at:Date
}