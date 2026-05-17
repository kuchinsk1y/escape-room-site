import { Injectable } from '@nestjs/common';
import { UserDataService } from './user.data-service';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(private userData: UserDataService) {}

  findAll(): Promise<User[]> {
    return this.userData.findAll();
  }

  findByEmail(email: string): Promise<User | null> {
    return this.userData.findByEmail(email);
  }

  create(data: {
    email: string;
    password: string;
    name?: string;
  }): Promise<User> {
    return this.userData.create(data);
  }
}
