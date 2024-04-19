import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '../category/entities';
import { CategoryController } from './controllers';
import { CategoryService } from './services';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports:[
        AuthModule,
        TypeOrmModule.forFeature([CategoryEntity])],
    controllers:[CategoryController],
    providers:[CategoryService]
})
export class AdminModule {}
