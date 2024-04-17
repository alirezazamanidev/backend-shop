import { Inject, Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { CheckOtpDto, SendOtpDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OtpEntity, UserEntity } from '../user/entities';
import { Repository } from 'typeorm';
import { randomInt } from 'crypto';
import { TokenService } from './tokens.service';
import { Request, Response } from 'express';
import { AuthResponse } from './types';
import { AuthMessage, CookieKeys, PublicMessage } from 'src/common/enums';
import { REQUEST } from '@nestjs/core';

@Injectable({scope:Scope.REQUEST})
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    @InjectRepository(OtpEntity) private otpRepo: Repository<OtpEntity>,
    private tokenService: TokenService,
    @Inject(REQUEST) private request:Request
  ) {}

  async sendOtp(SendOtpDto: SendOtpDto,response:Response) {
    const { phone } = SendOtpDto;

    let user = await this.userRepo.findOneBy({ phone });

    if (!user) {
      user = this.userRepo.create({ phone });
      user = await this.userRepo.save(user);
    }

    const otp = await this.createOtpForUser(user);
    const otpToken = await this.tokenService.createOtpToken({
      userId: user.id,
    });
    // Send SMS by Kavenegar service

    // create token for otp code
    this.setOtpCookie(response,{otpToken,code:otp.code});
  }

  async checkOtp(checkOtpDto:CheckOtpDto){
    const {code}=checkOtpDto;
    const otpToken=this.request.cookies?.[CookieKeys.Otp];
    if(!otpToken) throw new UnauthorizedException(AuthMessage.ExpiredCode);
    const {userId}=await this.tokenService.verifyOtpToken(otpToken);
    const otp=await this.otpRepo.findOneBy({userId});
    if(!otp) throw new UnauthorizedException(AuthMessage.LoginAgain);
    const now=new Date();
    if(otp.expiresIn<now) throw new UnauthorizedException(AuthMessage.ExpiredCode);
    if(otp.code!==code) throw new UnauthorizedException(AuthMessage.TryAgain);
    const accessToken=this.tokenService.createAccessToken({userId}); 
    return {
        message:PublicMessage.LoggedIn,
        accessToken
    }
  }


  private setOtpCookie(res:Response,result:AuthResponse){
    const {otpToken,code}=result
    res.cookie(CookieKeys.Otp,otpToken,{
        httpOnly:true,
        expires: new Date(Date.now() + (1000 * 60 * 2))

    })
    res.json({
        message:PublicMessage.SentOtp,
        code
    })
  }

  private async createOtpForUser(user: UserEntity) {
    let otp = await this.otpRepo.findOneBy({ userId: user.id });
    const code = randomInt(10000, 99999).toString();
    const expiresIn = new Date(new Date().getTime() + 2 * 1000 * 60);
    let existOtp = false;
    if (otp) {
      existOtp = true;
      otp.code = code;
      otp.expiresIn = expiresIn;
    } else {
      otp = this.otpRepo.create({
        code,
        expiresIn,
        userId: user.id,
      });
    }
    otp = await this.otpRepo.save(otp);
    if (!existOtp)
      await this.userRepo.update({ id: user.id }, { otpId: otp.id });
    return otp;
  }
}
