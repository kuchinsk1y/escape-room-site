import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from './interfaces/jwt-payload.interface';

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
  cookies: Record<string, string>;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userToken = req.cookies['jwt'];
      const adminToken = req.cookies['admin_jwt'];

      if (adminToken) {
        const payload = await this.jwtService.verifyAsync<JwtPayload>(
          adminToken,
          {
            secret: process.env.JWT_SECRET,
          },
        );
        req.user = payload;
      } else if (userToken) {
        const payload = await this.jwtService.verifyAsync<JwtPayload>(
          userToken,
          {
            secret: process.env.JWT_SECRET,
          },
        );
        req.user = payload;
      }
    } catch (err) {
      console.warn('Invalid JWT', err);
    }

    next();
  }
}
