import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmDbConfig } from './config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass:TypeOrmDbConfig,
      inject:[TypeOrmDbConfig]
    }),
    UserModule,
    AuthModule,
    CategoryModule,
    ProductModule,
    AdminModule
  ],
  providers:[TypeOrmDbConfig]
})
export class AppModule {}
