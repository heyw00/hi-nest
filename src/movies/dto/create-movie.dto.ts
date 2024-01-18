// 사람들이 보낼 수 있는거, 보냈으면 하는거

import { IsNumber, IsOptional, IsString } from 'class-validator'; //유효성 검사용 데코레이터

export class CreateMovieDTO {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsOptional() //
  @IsString({ each: true }) // each?: boolean -> 모든 요소를 하나씩 검사한다.
  readonly genres: string[];
}
