import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { BillsService } from 'src/bills/bills.service';
import { CreditLinesService } from 'src/credit-lines/credit-lines.service';
import { RequestWithUser } from 'src/helpers';
import { PurchasesService } from 'src/purchases/purchases.service';

@Controller('users')
@UseGuards(AuthenticatedGuard)
export class UsersController {
  constructor(
    private billsService: BillsService,
    private creditLinesService: CreditLinesService,
    private purchasesService: PurchasesService,
  ) {}

  @Get('bills')
  async getUserBills(@Req() req: RequestWithUser, @Res() res: Response) {
    const { user } = req;
    let bills = await this.billsService.findByUser(user.id);
    return res.status(200).json({ bills });
  }

  @Get('bills/upcoming')
  async getUpcomingBills(@Req() req: RequestWithUser, @Res() res: Response) {
    const { user } = req;
    let upcomingBills = await this.billsService.findUpcomingBills(user.id, 5);
    return res.status(200).json({ bills: upcomingBills });
  }

  @Get('purchases')
  async getUserPurchases(@Req() req: RequestWithUser, @Res() res: Response) {
    const { user } = req;
    let purchases = await this.purchasesService.findByUser(user.id);
    return res.status(200).json({ purchases });
  }

  @Get('purchases/recent')
  async getRecentPurchases(@Req() req: RequestWithUser, @Res() res: Response) {
    const { user } = req;
    let recentPurchases = await this.purchasesService.findRecentPurchases(
      user.id,
      5,
    );
    return res.status(200).json({ purchases: recentPurchases });
  }

  @Get('credit')
  async getCreditLines(@Req() req: RequestWithUser, @Res() res: Response) {
    const { user } = req;
    let creditLines = await this.creditLinesService.findByUser(user.id);
    return res.status(200).json({ creditLines });
  }
}
