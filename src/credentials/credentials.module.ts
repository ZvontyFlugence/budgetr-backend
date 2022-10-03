import { Module } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CredentialsController } from './credentials.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [CredentialsService, PrismaService],
  controllers: [CredentialsController],
})
export class CredentialsModule {}
