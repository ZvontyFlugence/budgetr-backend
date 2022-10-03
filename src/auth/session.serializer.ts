import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';

type SafeUser = Partial<User>;
type Done<T> = (err: Error | null, result: T) => void;

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private usersService: UsersService) {
    super();
  }

  serializeUser(user: SafeUser, done: Done<string>) {
    if (!!user?.id) done(null, user.id);
  }

  async deserializeUser(userId: string, done: Done<User>) {
    const user = await this.usersService.findById(userId);
    if (!!user) done(null, user);
  }
}
