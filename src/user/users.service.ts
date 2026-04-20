import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        { id: 1, email: 'user1@gmail.com', password: 'user1' },
        { id: 2, email: 'user2@gmail.com', password: 'user2' },
    ];
     findByUsername(username: string) {
    return this.users.find(user => user.email === username);
  }

}
