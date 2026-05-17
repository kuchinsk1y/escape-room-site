import { Module } from '@nestjs/common';
import { QuestService } from './quest.service';
import { QuestController } from './quest.controller';
import { QuestDataService } from './quest.data-service';
import { PrismaModule } from '../prisma/prisma.module';
import { AzureStorageService } from './azure-storage.service';

@Module({
  imports: [PrismaModule],
  controllers: [QuestController],
  providers: [QuestService, QuestDataService, AzureStorageService],
})
export class QuestModule {}
