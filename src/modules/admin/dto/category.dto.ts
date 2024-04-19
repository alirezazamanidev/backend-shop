import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class CreateCategoryDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name:string
    @ApiPropertyOptional()
    @IsString()
    slug:string

}