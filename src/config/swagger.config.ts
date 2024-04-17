import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default function SwaggerConfig(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('********* Backend shop **************')
    .setDescription('Thi backend shop')
    .setContact('alireza', null, 'alirezazamanidev80@gmail.com')
    .build();
    const document=SwaggerModule.createDocument(app,config,{});
    SwaggerModule.setup('swagger',app,document);
}
