import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id: string): Movie {
        const movie = this.movies.find(movie => movie.id === +id); // string을 number로 변환한다.
        if (!movie) {
            throw new NotFoundException(`Movie with ID ${id} not found.`);
        }
        return movie;
    }

    deleteOne(id: string) {
        this.getOne(id) //getOne 에서 에러가 없으면 그 뒤는 문제가 없다.
        this.movies = this.movies.filter(movie => movie.id !== +id);  // ????????// 왜 이렇게 하는지?
        return true;
    }

    create(movieData) {
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData,
        })
    }

    update(id:string, updateData) {  //가짜 데이터베이스를 사용하기 때문에 아래와 같이 작성함
      const movie = this.getOne(id); 
      this.deleteOne(id);
      this.movies.push({...movie, ...updateData}); // 과거의 데이터에 새로운 데이터를 더해서 새로운 movie를 만든다
    }
}
