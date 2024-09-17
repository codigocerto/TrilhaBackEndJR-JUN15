import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { SignupDto } from './dtos/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  public async signUp(@Body() data: SignupDto): Promise<SignupDto> {
    return this.authService.signup(data);
  }

  @Post('login')
  @UseGuards(LocalGuard)
  public async login(@Req() req: Request) {
    return req.user;
  }
}
