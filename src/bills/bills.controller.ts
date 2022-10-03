import {
  Body,
  Controller,
  Delete,
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
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { RequestWithUser } from 'src/helpers';
import { CreateBillData } from './bills.dto';
import { BillsService } from './bills.service';

@Controller('bills')
@UseGuards(AuthenticatedGuard)
export class BillsController {
  constructor(
    private billsService: BillsService,
    private cloudinary: CloudinaryService,
  ) {}

  @Post('create')
  async createBill(
    @Req() req: RequestWithUser,
    @Body() body: CreateBillData,
    @Res() res: Response,
  ) {
    const { user } = req;
    let imageCloudinaryUrl = await this.cloudinary.uploadImage(body.image);

    try {
      await this.billsService.createBill({
        category: body.category,
        credentials: {
          create: {
            type: body.credentials.type,
            email: body.credentials.email,
            username: body.credentials.username,
            password: body.credentials.password,
          },
        },
        dayOfMonth: body.dayOfMonth,
        image: imageCloudinaryUrl,
        name: body.name,
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
  async getBill(@Param('id') billId: string, @Res() res: Response) {
    let bill = await this.billsService.findById(billId);

    if (bill) return res.status(200).json({ bill });
    return res.status(404).json({ bill, error: 'Bill Not Found' });
  }

  @Delete(':id')
  async deleteBill(@Param('id') billId: string, @Res() res: Response) {
    let deletedBill = await this.billsService.deleteBill(billId);

    if (deletedBill) return res.status(200).json({ deletedBill });
    return res.status(404).json({ deletedBill, error: 'Bill Not Found' });
  }
}
