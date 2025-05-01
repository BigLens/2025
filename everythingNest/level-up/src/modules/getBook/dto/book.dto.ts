import { Type } from 'class-transformer';
import { Min, Max, IsString, IsInt } from 'class-validator';

const presentYear = new Date().getFullYear();
export class BookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @Type(() => Number)
  @IsInt()
  @Min(1500)
  @Max(presentYear)
  year: number;
}
