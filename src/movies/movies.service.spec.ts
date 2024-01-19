import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';
import { log } from 'console';

describe('MoviesService', () => { 
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll", () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array); // result가 배열 인스턴스인지 테스트
    })
  });

  describe("getOne", () => {
    it('should return a movie', () => {
      service.create({
        title:"Test Movie",
        genres: ['test'],
        year: 2000,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined(); // 존재하는지
      expect(movie.id).toEqual(1);
    });

    it('should throw 404 error', () => {
      try{
        service.getOne(999);
      }catch(e) {
        expect(e).toBeInstanceOf(NotFoundException); //  에러가 나타나는지
        expect(e.message).toEqual(`Movie with ID 999 not found.`); // 에러 메세지 확인
      }
    })
  });

    describe('deleteOne', () => {
      it("delete a movie", () => {
        service.create({
          title:"Test Movie",
          genres: ['Test'],
          year: 2000,
        });
        const beforeDelete = service.getAll().length; //1
        service.deleteOne(1);
        const afterDelete = service.getAll().length; //0
        //expect(afterDelete.length).toEqual(allMovies.length -1);
        expect(afterDelete).toBeLessThan(beforeDelete);
      });
      it('should return a 404', () => {
        try{
          service.deleteOne(999);
        }catch(e) {
          expect(e).toBeInstanceOf(NotFoundException); 
          expect(e.message).toEqual(`Movie with ID 999 not found.`); 
        }
      });
    });

    describe('create', () => {
      it('should create a movie', () => {
        const beforeCreate = service.getAll().length;
        service.create({
          title:"Test Movie",
          genres: ['Test'],
          year: 2000,
        });
        const afterCreate = service.getAll().length;
        console.log(beforeCreate, afterCreate);
        expect(afterCreate).toBeGreaterThan(beforeCreate);
      })
    })

    describe('update', () => {
      it('should update a movie', () => {
        service.create({
          title:"Test Movie",
          genres: ['Test'],
          year: 2000,
        });
        service.update(1, { title: 'Updated Test' });
        const movie = service.getOne(1);
        expect(movie.title).toEqual('Updated Test');
      });
      it('should throw a NotFoundExcepton', () => {
        try{
          service.update(999, {});
        }catch(e) {
          expect(e).toBeInstanceOf(NotFoundException); 
        }
      });
    })
});
