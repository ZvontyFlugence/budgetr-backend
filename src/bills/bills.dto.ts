import { CreateCredentialsData } from 'src/credentials/credentials.dto';

export type CreateBillData = {
  category: number;
  credentials: CreateCredentialsData;
  dayOfMonth: number;
  description?: string;
  image: string;
  name: string;
  price: number;
};
