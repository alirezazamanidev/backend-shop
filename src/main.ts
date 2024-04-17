import './config/env.config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import SwaggerConfig from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
