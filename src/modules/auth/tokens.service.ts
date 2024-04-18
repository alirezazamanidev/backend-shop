import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenPayload, CookieOtpPayload } from './types';
import { AuthMessage } from 'src/common/enums';

@Injectable()
export class TokenService {
  constructor(private JwtService: JwtService) {}

  createOtpToken(payload: CookieOtpPayload) {
    const token = this.JwtService.sign(payload, {
      secret: process.env.OTP_TOKEN_SECRET,
      expiresIn: 60 * 2,
    });
    return token;
  }
  async verifyOtpToken(token: string):Promise<CookieOtpPayload> {
    try {
      return await this.JwtService.verify(token, {
        secret: process.env.OTP_TOKEN_SECRET,
      });
    } catch (err) {
      throw new UnauthorizedException(AuthMessage.TryAgain);
    }
  }

  createAccessToken(payload:AccessTokenPayload){
    const token=this.JwtService.sign(payload,{
        secret:process.env.ACCESS_TOKEN_SECRET,
        expiresIn: '7d'

    })
    return token;
  }
  verifyAccessToken(token:string):AccessTokenPayload{
    try {
      return this.JwtService.verify(token, {
          secret: process.env.ACCESS_TOKEN_SECRET,
      })
  } catch (error) {
      throw new UnauthorizedException(AuthMessage.LoginAgain)
  }
  }
}
