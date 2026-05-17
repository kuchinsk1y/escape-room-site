import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import type { AuthenticatedRequest } from './auth.middleware';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<AuthenticatedRequest>();
    if (!req.user) throw new ForbiddenException('User not authenticated');
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Admin access required');
    return true;
  }
}
