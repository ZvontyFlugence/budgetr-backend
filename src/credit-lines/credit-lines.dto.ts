import { CreateCredentialsData } from 'src/credentials/credentials.dto';

export type CreateCreditLineData = {
  company: string;
  balance: number;
  limit: number;
  credentials: CreateCredentialsData;
};
