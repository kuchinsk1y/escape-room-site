import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { AdminAuthController } from './admin-auth.controller';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'jwt_secret_key',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController, AdminAuthController],
  providers: [AuthService],
  exports: [JwtModule],
})
export class AuthModule {}
