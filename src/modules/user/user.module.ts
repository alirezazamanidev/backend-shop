import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpEntity, UserEntity } from './entities';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity,OtpEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports:[TypeOrmModule]
})
export class UserModule {}
