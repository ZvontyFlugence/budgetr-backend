import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { BillsModule } from './bills/bills.module';
import { PurchasesModule } from './purchases/purchases.module';
import { CreditLinesModule } from './credit-lines/credit-lines.module';
import { DebtModule } from './debt/debt.module';
import { CredentialsModule } from './credentials/credentials.module';
import { BudgetModule } from './budget/budget.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        SESSION_SECRET: Joi.string().required(),
        REDIS_URL: Joi.string().required(),
        CLOUDINARY_CLOUD_NAME: Joi.string().required(),
        CLOUDINARY_API_KEY: Joi.string().required(),
        CLOUDINARY_API_SECRET: Joi.string().required(),
      }),
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    BillsModule,
    PurchasesModule,
    CreditLinesModule,
    DebtModule,
    CredentialsModule,
    BudgetModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
