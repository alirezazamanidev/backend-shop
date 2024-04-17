import { Injectable } from '@nestjs/common';
import { SendOtpDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OtpEntity, UserEntity } from '../user/entities';
import { Repository } from 'typeorm';
import { randomInt } from 'crypto';
import { TokenService } from './tokens.service';
import { Response } from 'express';
import { AuthResponse } from './types';
import { CookieKeys, PublicMessage } from 'src/common/enums';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    @InjectRepository(OtpEntity) private otpRepo: Repository<OtpEntity>,
    private tokenService: TokenService,
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
    let existOtp = true;
    if (otp) {
      existOtp = false;
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
