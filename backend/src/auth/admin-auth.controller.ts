import {
  Controller,
  Post,
  Body,
  Res,
  HttpCode,
  Get,
  Req,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { AdminGuard } from './admin.guard';
import type { AuthenticatedRequest } from './auth.middleware';

@Controller('auth/admin')
export class AdminAuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('sign-in')
  async signIn(
    @Body() dto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(dto.email, dto.password);

    if (user.role !== 'ADMIN')
      throw new ForbiddenException('Admin access required');

    const token = this.authService.generateToken(user);

    res.cookie('admin_jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
    });

    return { message: 'Admin login successful' };
  }

  @HttpCode(200)
  @Post('sign-out')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('admin_jwt', { path: '/' });
    return { message: 'Logged out successfully' };
  }

  @UseGuards(AdminGuard)
  @Get('me')
  getMe(@Req() req: AuthenticatedRequest) {
    if (!req.user) throw new ForbiddenException('User not authenticated');
    const user = req.user;
    return {
      id: user.sub,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }
}
