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
import { CreateCreditLineData } from './credit-lines.dto';
import { CreditLinesService } from './credit-lines.service';

@Controller('credit-lines')
@UseGuards(AuthenticatedGuard)
export class CreditLinesController {
  constructor(private creditLinesService: CreditLinesService) {}

  @Post('create')
  async createCreditLine(
    @Req() req: RequestWithUser,
    @Body() body: CreateCreditLineData,
    @Res() res: Response,
  ) {
    const { user } = req;

    try {
      const creditLine = await this.creditLinesService.createCreditLine({
        company: body.company,
        balance: new Decimal(body.balance),
        limit: new Decimal(body.limit),
        credentials: {
          create: body.credentials,
        },
        user: {
          connect: {
            id: user.id,
          },
        },
      });

      return res.status(201).json({ creditLine });
    } catch (e: any) {
      console.error(e);
      return res
        .status(500)
        .json({ creditLine: null, error: 'Internal Service Error' });
    }
  }

  @Post(':id/delete')
  async deleteCreditLine(@Param('id') creditId: string, @Res() res: Response) {
    const deleted = await this.creditLinesService.deleteCreditLine(creditId);
    if (deleted) return res.status(200).json({ success: true });
    return res
      .status(404)
      .json({ success: false, error: 'Credit Line Not Found' });
  }

  @Get(':id')
  async findById(@Param('id') creditId: string, @Res() res: Response) {
    const creditLine = await this.creditLinesService.findById(creditId);
    if (creditLine) return res.status(200).json({ creditLine });
    return res.status(404).json({ creditLine, error: 'Credit Line Not Found' });
  }
}
