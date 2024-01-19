import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
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

