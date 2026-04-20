import { Injectable } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  validateUser(username: string, password: string) {
    const user = this.userService.findByUsername(username);

    if (!user || user.password !== password) {
      throw new UnauthorizedException();
    }

    return user;
  }

  login(user: any) {
    const payload = { sub: user.id, username: user.username };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}