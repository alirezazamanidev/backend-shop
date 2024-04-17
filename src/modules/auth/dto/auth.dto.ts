import { ApiProperty } from "@nestjs/swagger";
import { IsMobilePhone, IsString, Length } from "class-validator";

export class SendOtpDto {
    
    @ApiProperty()
    @IsString()
    @IsMobilePhone('fa-IR',{},{message:'فرمت شماره تلفن  نادرست است'})
    phone:string
}


export class CheckOtpDto {
    
    @ApiProperty()
    @IsString()
    @Length(5,5)
    code:string
}
