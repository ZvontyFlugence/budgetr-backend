import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as argon2 from 'argon2';
import { UsersService } from 'src/users/users.service';

export type SafeUser = Partial<User>;

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<SafeUser | null> {
    const user = await this.usersService.findOne(email);

    // Check password
    try {
      if (user && (await argon2.verify(user.password, password))) {
        // password match
        const { password, email, ...rest } = user;
        return rest;
      } else {
        // password did not match
        return null;
      }
    } catch (err: any) {
      // internal failure
      return null;
    }
  }
}
