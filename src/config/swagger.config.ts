import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export default function SwaggerConfig(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('********* Backend shop **************')
    .setDescription('Thi backend shop')
    .setContact('alireza', null, 'alirezazamanidev80@gmail.com')
    .addSecurity('Authorization', SwaggerAuthConfig())
    .build();
  const document = SwaggerModule.createDocument(app, config, {});
  SwaggerModule.setup('swagger', app, document);
}
function SwaggerAuthConfig(): SecuritySchemeObject {
  return {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    name: 'authorization',
    in: 'header',
  };
}
