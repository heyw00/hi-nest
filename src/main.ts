import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({  //ValidationPipe : 유효성 검사를 해준다 , npm i class-validator class-transformer
    whitelist: true, // 데코레이터가 없는 property의 object 를 거른다
    forbidNonWhitelisted: true,
    transform: true,
  }))
  await app.listen(3000);
}
bootstrap(); 
