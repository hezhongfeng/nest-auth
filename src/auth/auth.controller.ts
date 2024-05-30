import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Session,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Session() session, @Body() signInDto: Record<string, any>) {
    await this.authService.signIn(signInDto.username, signInDto.password);
    session.isAuth = true;
    return 'ok';
  }

  @Get('/current-user')
  getCurrentUser(@Session() session) {
    console.log(session);
    session.ok = true;
    return 'current-user';
  }
}
