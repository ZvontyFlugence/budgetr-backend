import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule],
  providers: [BillsService, PrismaService],
  controllers: [BillsController],
  exports: [BillsService],
})
export class BillsModule {}
