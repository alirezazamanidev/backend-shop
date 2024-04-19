import { BaseEntity } from 'src/common/abstracts';
import { EntityName } from 'src/common/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';
import { OtpEntity } from './otp.entity';
import { ProductEntity } from 'src/modules/product/enities';

@Entity(EntityName.User)
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  phone: string;
  @Column({ unique: true,nullable:true })
  username: string;
  @Column({ default: false })
  phone_verify: boolean;

  @Column({nullable:true})
  otpId: number;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @OneToOne(() => OtpEntity, (otp) => otp.user, { onDelete: 'CASCADE' })
  @JoinColumn({name:'otpId'})
  otp: OtpEntity;
  @OneToMany(()=>ProductEntity,product=>product.supplear)
  products:ProductEntity[]
  
}
