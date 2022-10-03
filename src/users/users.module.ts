import { Module } from '@nestjs/common';
import { BillsModule } from 'src/bills/bills.module';
import { CreditLinesModule } from 'src/credit-lines/credit-lines.module';
import { PrismaService } from 'src/prisma.service';
import { PurchasesModule } from 'src/purchases/purchases.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [BillsModule, CreditLinesModule, PurchasesModule],
  providers: [UsersService, PrismaService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
