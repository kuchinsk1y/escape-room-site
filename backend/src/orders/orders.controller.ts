import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  ForbiddenException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthenticatedRequest } from '../auth/auth.middleware';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req: AuthenticatedRequest, @Body() dto: CreateOrderDto) {
    return this.ordersService.create(req.user!.sub, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  async getMyOrders(@Req() req: AuthenticatedRequest) {
    return this.ordersService.findUserOrders(req.user!.sub);
  }
  /** Получение всех заказов — только для админов */
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllOrders(@Req() req: AuthenticatedRequest) {
    // Проверка роли пользователя
    if (req.user!.role !== 'ADMIN') {
      throw new ForbiddenException('Доступ только для админов');
    }

    return this.ordersService.findAllOrders();
  } /*  */
}
