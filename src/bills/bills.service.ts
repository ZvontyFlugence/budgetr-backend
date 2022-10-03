import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Bill, Prisma } from '@prisma/client';

@Injectable()
export class BillsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Creates a new bill
   * @param data Data necessary to create a new bill record
   * @returns created bill
   */
  async createBill(data: Prisma.BillCreateInput): Promise<Bill> {
    return this.prisma.bill.create({ data });
  }

  /**
   * Deletes a bill
   * @param id UUID string of target bill
   * @returns deleted bill
   */
  async deleteBill(id: string): Promise<Bill> {
    return this.prisma.bill.delete({
      where: { id },
    });
  }

  /**
   * Get all user bills
   * @param userId UUID string of target user
   * @returns list of bills associated with target user
   */
  async findByUser(userId: string): Promise<Bill[]> {
    return this.prisma.bill.findMany({
      where: { userId },
    });
  }

  /**
   * Gets all or specific number of upcoming bills
   * @param userId UUID string of target user
   * @param limit optional number to limit returned records
   * @returns list of bills associated with target user that are upcoming
   */
  async findUpcomingBills(userId: string, limit?: number): Promise<Bill[]> {
    return this.prisma.bill.findMany({
      where: {
        AND: [{ userId }, { dayOfMonth: { gte: new Date().getUTCDate() } }],
      },
      orderBy: { dayOfMonth: 'asc' },
      take: limit,
    });
  }

  /**
   * Get one bill by its id
   * @param id UUID string of target bill
   * @returns bill with given id, or null if not found
   */
  async findById(id: string): Promise<Bill | null> {
    return this.prisma.bill.findUnique({ where: { id } });
  }
}
