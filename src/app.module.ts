import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';

//데코레이터 : 클래스에 함수 기능을 추가할 수 있다. 클래스 위의 함수이고, 클래스를 위해 움직인다.
@Module({
  imports: [MoviesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
