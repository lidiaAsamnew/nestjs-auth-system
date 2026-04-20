import { Injectable } from '@nestjs/common';
import { User, UsersService } from '../user/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  validateUser(email: string, password: string): User {
    const user = this.userService.findByEmail(email);

    if (!user || user.password !== password) {
      throw new UnauthorizedException();
    }

    return user;
  }

  login(user: User) {
    const payload = { sub: user.id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}