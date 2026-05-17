import { Injectable } from '@nestjs/common';
import { QuestDataService } from './quest.data-service';
import { CreateQuestDto } from './dto/create-quest.dto';
import { AzureStorageService } from './azure-storage.service';

@Injectable()
export class QuestService {
  constructor(
    private questData: QuestDataService,
    private azureStorage: AzureStorageService,
  ) {}

  findAll() {
    return this.questData.findAll();
  }

  async createWithImage(data: CreateQuestDto, file: Express.Multer.File) {
    let imageUrl: string | undefined;

    if (file) imageUrl = await this.azureStorage.uploadFile(file);

    return this.questData.create({
      ...data,
      duration: Number(data.duration),
      minPlayers: Number(data.minPlayers),
      maxPlayers: Number(data.maxPlayers),
      image: imageUrl ?? '',
    });
  }
}
