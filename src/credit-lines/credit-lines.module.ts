import { Module } from '@nestjs/common';
import { CreditLinesService } from './credit-lines.service';
import { CreditLinesController } from './credit-lines.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [CreditLinesService, PrismaService],
  controllers: [CreditLinesController],
  exports: [CreditLinesService],
})
export class CreditLinesModule {}
