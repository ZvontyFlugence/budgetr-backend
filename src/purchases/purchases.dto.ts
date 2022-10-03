import { Decimal } from '@prisma/client/runtime';
import { CreateCredentialsData } from 'src/credentials/credentials.dto';

export type CreatePurchaseData = {
  product: string;
  vendor: string;
  category: number;
  date?: Date;
  description?: string;
  price: Decimal;
  credentials: CreateCredentialsData;
};
