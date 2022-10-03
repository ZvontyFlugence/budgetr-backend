import { Injectable } from '@nestjs/common';
import { CreditLine, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CreditLinesService {
  constructor(private prisma: PrismaService) {}

  async createCreditLine(
    data: Prisma.CreditLineCreateInput,
  ): Promise<CreditLine | null> {
    return this.prisma.creditLine.create({ data });
  }

  async deleteCreditLine(creditId: string): Promise<boolean> {
    return !!this.prisma.creditLine.delete({ where: { id: creditId } });
  }

  async findById(creditId: string): Promise<CreditLine | null> {
    return this.prisma.creditLine.findUnique({ where: { id: creditId } });
  }

  async findByUser(userId: string): Promise<CreditLine[]> {
    return this.prisma.creditLine.findMany({ where: { userId } });
  }

  async updateBalance(creditId: string, newBalance: number): Promise<boolean> {
    return !!this.prisma.creditLine.update({
      data: {
        balance: {
          set: new Decimal(newBalance),
        },
      },
      where: { id: creditId },
    });
  }

  async updateLimit(creditId: string, newLimit: number): Promise<boolean> {
    return !!this.prisma.creditLine.update({
      data: {
        limit: {
          set: new Decimal(newLimit),
        },
      },
      where: { id: creditId },
    });
  }
}
