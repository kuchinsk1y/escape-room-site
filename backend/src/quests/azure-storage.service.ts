import { Injectable } from '@nestjs/common';
import { BlobServiceClient } from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';
import { Express } from 'express';

@Injectable()
export class AzureStorageService {
  private blobServiceClient: BlobServiceClient;
  private containerName: string;

  constructor() {
    this.blobServiceClient = BlobServiceClient.fromConnectionString(
      process.env.AZURE_STORAGE_CONNECTION_STRING!,
    );
    this.containerName = process.env.AZURE_CONTAINER_NAME!;
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    if (!file) throw new Error('Файл не передан');

    const containerClient = this.blobServiceClient.getContainerClient(
      this.containerName,
    );

    const blobName: string = `${(uuidv4 as () => string)()}-${file.originalname}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadData(file.buffer);

    return blockBlobClient.url;
  }
}
