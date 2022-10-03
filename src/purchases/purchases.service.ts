import { Injectable } from '@nestjs/common';
import { Prisma, Purchase } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService) {}

  /**
   * Creates a new purchase
   * @param data Data necessary to create a new purchase record
   * @returns created purchase
   */
  async createPurchase(
    data: Prisma.PurchaseCreateInput,
  ): Promise<Purchase | null> {
    return this.prisma.purchase.create({ data });
  }

  /**
   * Get all user purchases
   * @param userId UUID string of target user
   * @returns list of purchases associated with target user
   */
  async findByUser(userId: string): Promise<Purchase[]> {
    return this.prisma.purchase.findMany({
      where: { userId },
    });
  }

  /**
   * Gets all or specific number of recent purchases
   * @param userId UUID string of target user
   * @param limit optional number to limit returned records
   * @returns list of purchases associated with target user that were within the last month
   */
  async findRecentPurchases(
    userId: string,
    limit?: number,
  ): Promise<Purchase[]> {
    return this.prisma.purchase.findMany({
      where: {
        AND: [
          { userId },
          {
            date: {
              gte: new Date(
                new Date().setUTCMonth(new Date().getUTCMonth() - 1),
              ),
            },
          },
        ],
      },
      orderBy: { date: 'desc' },
      take: limit,
    });
  }

  /**
   * Get one purchase by its id
   * @param id UUID string of target purchase
   * @returns purchase with given id, or null if not found
   */
  async findById(id: string): Promise<Purchase | null> {
    return this.prisma.purchase.findUnique({ where: { id } });
  }
}
