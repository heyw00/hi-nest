import { PartialType } from "@nestjs/mapped-types"; //mapped-types -> 타입을 변환시키고 사용할 수 있게 하는 패키지
import { IsNumber, IsString } from "class-validator";
import { CreateMovieDTO } from "./create-movie.dto";

export class UpdateMovieDTO extends PartialType(CreateMovieDTO){  //베이스타입 작성
    // 하나만 수정할 수 있기에 필수 사항이 아니게 작성한다. 
    // @IsString()
    // readonly title?: string;
    // @IsNumber()
    // readonly year?: number;
    // @IsString({ each: true})
    // readonly genres?: string[];

    //부분 타입(partial types)
    
}