import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';

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
    getOne(@Param('id') movieId: string): Movie{
        return this.moviesService.getOne(movieId);
    }

    @Post()
    create(@Body() movieData){
        console.log(movieData);
        return this.moviesService.create(movieData);
    }

    @Delete("/:id")
    remove(@Param('id') movieId: string) {
        return this.moviesService.deleteOne(movieId);
    }

    @Patch('/:id')
    path(@Param('id') movieId: string, @Body() updateData ) {
        return this.moviesService.update(movieId, updateData);
    }


}


