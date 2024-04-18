import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ContentType, SwaggerTags } from 'src/common/enums';
import { CheckOtpDto, SendOtpDto } from './dto';
import { Request, Response } from 'express';
import { Auth } from 'src/common/decorators';
import { AuthGuard } from './guards';

@Controller('auth')
@ApiTags(SwaggerTags.Authorization)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'send otp' })
  @HttpCode(HttpStatus.OK)
  @Post('/send-otp')
  @ApiConsumes(ContentType.UrlEncoded, ContentType.Json)
  sendOtp(@Body() SendOtpDto: SendOtpDto, @Res() res: Response) {
    return this.authService.sendOtp(SendOtpDto, res);
  }

  @ApiOperation({ summary: 'check otp' })
  @HttpCode(HttpStatus.OK)
  @Post('/check-otp')
  @ApiConsumes(ContentType.UrlEncoded, ContentType.Json)
  checkOtp(@Body() checkOtpDto: CheckOtpDto) {
    return this.authService.checkOtp(checkOtpDto);
  }

  @ApiOperation({ summary: 'check login' })
 
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiSecurity('Authorization')
  @Get('check-login')
  checkLogin(@Req() req: Request) {
    return {
      data: {
        userLogin: req.user,
      },
    };
  }
}
