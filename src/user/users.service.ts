import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  email: string;
  password: string;
};

@Injectable()
export class UsersService {
  private users: User[] = [
        { id: 1, email: 'user1@gmail.com', password: 'user1pw' },
        { id: 2, email: 'user2@gmail.com', password: 'user2pw' },
    ];

  findByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }

}
