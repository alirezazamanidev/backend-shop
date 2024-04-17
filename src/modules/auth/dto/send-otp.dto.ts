import { ApiProperty } from "@nestjs/swagger";
import { IsMobilePhone, IsString } from "class-validator";

export class SendOtpDto {
    
    @ApiProperty()
    @IsString()
    @IsMobilePhone('fa-IR',{},{message:'فرمت شماره تلفن  نادرست است'})
    phone:string
}