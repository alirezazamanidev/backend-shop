import './config/env.config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import SwaggerConfig from './config/swagger.config';
import * as cookieParser from 'cookie-parser';
import { getGlobalFilters } from './common/exceptions';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { ValidationPipeErorr } from './common/pipes/validation.pipe';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser(process.env.COOKIE_TOKEN_SECRET))
  const httpAdapter = app.get(HttpAdapterHost);

  // exceptions
  app.useGlobalFilters(...getGlobalFilters(httpAdapter))
  app.useGlobalPipes(new ValidationPipeErorr());
  app.setGlobalPrefix('api');
  // swagger config
  SwaggerConfig(app);
  // set prot application
  const { PORT } = process.env;
  await app.listen(PORT, () => {
    console.log(`Run => http://localhost:${PORT}/api`);
    console.log(`Run Swagger => http://localhost:${PORT}/swagger`);
  });
}
bootstrap();
