import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CredentialsService {
  constructor(private prisma: PrismaService) {}

  async updateCredentials(
    id: string,
    data: Prisma.CredentialsCreateInput,
  ): Promise<boolean> {
    const updated = await this.prisma.credentials.update({
      data,
      where: { id },
    });

    return !!updated;
  }
}
