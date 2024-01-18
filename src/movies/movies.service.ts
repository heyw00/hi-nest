import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id: number): Movie {
        const movie = this.movies.find(movie => movie.id === id); // +id : string을 number로 변환한다.
        if (!movie) {
            throw new NotFoundException(`Movie with ID ${id} not found.`);
        }
        return movie;
    }

    deleteOne(id: number) {
        this.getOne(id) //getOne 에서 에러가 없으면 그 뒤는 문제가 없다.
        this.movies = this.movies.filter(movie => movie.id !== id);  //기존의 배열을 필터링된 새로운 배열로 업데이트
        return true;
    }

    create(movieData: CreateMovieDTO) {
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData,
        })
    }

    update(id:number, updateData: UpdateMovieDTO) {  //가짜 데이터베이스를 사용하기 때문에 아래와 같이 작성함
      const movie = this.getOne(id); 
      this.deleteOne(id);
      this.movies.push({...movie, ...updateData}); // 과거의 데이터에 새로운 데이터를 더해서 새로운 movie를 만든다
    }
}
