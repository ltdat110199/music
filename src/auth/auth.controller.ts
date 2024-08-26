import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    return this.authService.login(loginDto);
  }
  @Post('register')
  async register(
    @Body() loginDto: { email: string; password: string; fullName: string },
  ) {
    return this.authService.register(loginDto);
  }
  @Post('refreshtoken')
  async refreshtoken(@Body() token: { refreshToken: string }) {
    return this.authService.refreshToken(token);
  }
}
