import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDTO } from './dto/create-movie.dto';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}//moviesService는 MoviesService라는 클래스이다.

    @Get()
    getAll() :Movie[]{
        return this.moviesService.getAll();
    }

    @Get('search') //search 부분이 get :id 보다 밑에 있으면 NestJS search를 id로 판단한다
    search(@Query('year') searchingYear: string) {
        return `we are searching for a movie made after: ${searchingYear}`;
    }

    @Get('/:id')
    getOne(@Param('id') movieId: number): Movie{  // movieId stirng-> number , 파이프 transformer를 통해
        return this.moviesService.getOne(movieId);
    }

    @Post()
    create(@Body() movieData: CreateMovieDTO){
        console.log(movieData);
        return this.moviesService.create(movieData);
    }

    @Delete("/:id")
    remove(@Param('id') movieId: number) {
        return this.moviesService.deleteOne(movieId);
    }

    @Patch('/:id')
    path(@Param('id') movieId: number, @Body() updateData ) {
        return this.moviesService.update(movieId, updateData);
    }


}


