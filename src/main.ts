import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { cors } from './source-code/common/cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors });

  const config = new DocumentBuilder()
    .setTitle('Logineth')
    .setDescription('Logineth')
    .setVersion('1.0.0')
    .addTag('account | friend')
    .addTag('account | login')
    .addTag('account | profile')
    .addTag('account | rank')
    .addTag('account | register')
    .addTag('account | setting')
    .addTag('common | data')
    .addTag('common | ws')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
