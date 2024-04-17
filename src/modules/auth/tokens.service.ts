import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CookieOtpPayload } from './types';

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
}
