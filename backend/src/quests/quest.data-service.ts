import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestDto } from './dto/create-quest.dto';

@Injectable()
export class QuestDataService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.quest.findMany();
  }

  create(data: CreateQuestDto) {
    return this.prisma.quest.create({ data });
  }
}
