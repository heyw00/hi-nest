import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

//supertest 라이브러리 사용 

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // main.ts 설정 추가하기
    app.useGlobalPipes(new ValidationPipe({  //ValidationPipe : 유효성 검사를 해준다 , npm i class-validator class-transformer
      whitelist: true, // 데코레이터가 없는 property의 object 를 거른다
      forbidNonWhitelisted: true,
      transform: true,
    }))
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      //.expect('Hello World!');
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer())
        .get('/movies')
        .expect(200)
        .expect([]);
    }) 
    it('POST', () => {
      return request(app.getHttpServer())
      .post('/movies')
      .send({
        title: 'Test',
        year: 2000,
        genres: ['test'],
      })
      .expect(201)
    });

    it('DELET', () => {
      return request(app.getHttpServer())
      .delete('/movies')
      .expect(404)
    })
  }); 
});

// NestJS는 테스트마다 어플리케이션을 생성한다. 진짜 어플리케이션과는 다르다. 
// e2e는 trnasformer가 적용되지 않는다. -> 관련 설정을 테스트 어플리케이션에도 추가한다.