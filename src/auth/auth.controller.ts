import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { AuthenticatedGuard } from './authenticated.guard';
import { LocalAuthGuard } from './local-auth.guard';

interface CreateUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private usersService: UsersService) {}

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(AuthenticatedGuard)
  @Post('logout')
  async logout(@Req() req: Request) {
    req.logOut((err: any) => {
      throw new Error(err);
    });

    req.session.cookie.maxAge = 0;
  }

  @Post('register')
  async register(@Body() payload: CreateUser) {
    try {
      // Hash password
      const hash = await argon2.hash(payload.password);

      // Create User
      let user = this.usersService.create({ ...payload, password: hash });

      return user;
    } catch (err: any) {
      return null;
    }
  }

  @HttpCode(200)
  @UseGuards(AuthenticatedGuard)
  @Get()
  async authenticate(@Req() req: Request) {
    return req.user;
  }
}
