import {
  Controller,
  Post,
  Body,
  Res,
  HttpCode,
  Get,
  Req,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import type { AuthenticatedRequest } from './auth.middleware';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto.email, dto.password, dto.name);
  }

  @HttpCode(200)
  @Post('sign-in')
  async signIn(
    @Body() dto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.signIn(dto.email, dto.password);

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return { message: 'Successful login' };
  }

  @HttpCode(200)
  @Post('sign-out')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');
    return { message: 'Logged out successfully' };
  }

  @Get('me')
  getMe(@Req() req: AuthenticatedRequest) {
    if (!req.user) return null;
    return {
      id: req.user.sub,
      email: req.user.email,
      name: req.user.name,
      role: req.user.role,
    };
  }
}
