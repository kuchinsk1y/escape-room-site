import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateOrderDto) {
    return this.prisma.order.create({
      data: {
        userId,
        questId: dto.questId,
        name: dto.name,
        phone: dto.phone,
        participants: dto.participants,
      },
    });
  }

  async findUserOrders(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { quest: true },
    });
  }

  async findAllOrders() {
    return this.prisma.order.findMany({
      include: {
        user: true, // чтобы видеть клиента
        quest: true, // чтобы видеть квест
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
