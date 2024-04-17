import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ContentType, SwaggerTags } from 'src/common/enums';
import { SendOtpDto } from './dto';
import { Response } from 'express';

@Controller('auth')
@ApiTags(SwaggerTags.Authorization)
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @ApiOperation({summary:'send otp'})
  @HttpCode(HttpStatus.OK)
  @Post('/send-otp')
  @ApiConsumes(ContentType.UrlEncoded,ContentType.Json)
  sendOtp(@Body() SendOtpDto:SendOtpDto,@Res() res:Response){
    return this.authService.sendOtp(SendOtpDto,res);
  }
}
