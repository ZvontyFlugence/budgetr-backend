import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime';
import { Response } from 'express';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { RequestWithUser } from 'src/helpers';
import { CreatePurchaseData } from './purchases.dto';
import { PurchasesService } from './purchases.service';

@Controller('purchases')
@UseGuards(AuthenticatedGuard)
export class PurchasesController {
  constructor(private purchasesService: PurchasesService) {}

  @Post('create')
  async createPurchase(
    @Req() req: RequestWithUser,
    @Body() body: CreatePurchaseData,
    @Res() res: Response,
  ) {
    const { user } = req;

    try {
      await this.purchasesService.createPurchase({
        category: body.category,
        credentials: {
          create: body.credentials,
        },
        date: body.date ?? new Date(),
        product: body.product,
        vendor: body.vendor,
        price: new Decimal(body.price),
        description: body.description,
        user: {
          connect: {
            id: user.id,
          },
        },
      });

      return res.status(201).json({ success: true });
    } catch (e: any) {
      console.error(e);
      return res
        .status(500)
        .json({ success: false, error: 'Internal Service Error' });
    }
  }

  @Get(':id')
  async getPurchase(@Param('id') purchaseId: string, @Res() res: Response) {
    let purchase = await this.purchasesService.findById(purchaseId);

    if (purchase) return res.status(200).json({ purchase });
    return res.status(404).json({ purchase, error: 'Purchase Not Found' });
  }
}
