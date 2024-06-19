import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDTO } from './dto/login.dto';
import {
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDoc } from './docs/login.doc';
import { UnauthorizedLoginDoc } from './docs/unauthorized-login.doc';
import { LoginResponseDoc } from './docs/login.response.doc';

@ApiTags('1 - Autentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginDoc })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: UnauthorizedLoginDoc,
  })
  @ApiResponse({ status: HttpStatus.OK, type: LoginResponseDoc })
  @HttpCode(200)
  @Post()
  create(@Body() createAuthDto: loginDTO) {
    return this.authService.login(createAuthDto);
  }
}
