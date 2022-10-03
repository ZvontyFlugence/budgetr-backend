import { Body, Controller, Param, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { CreateCredentialsData } from './credentials.dto';
import { CredentialsService } from './credentials.service';

@Controller('credentials')
@UseGuards(AuthenticatedGuard)
export class CredentialsController {
  constructor(private credentialsService: CredentialsService) {}

  @Post('/update/:id')
  async updateCredentials(
    @Param('id') id: string,
    @Body() data: CreateCredentialsData,
    @Res() res: Response,
  ) {
    const result = await this.credentialsService.updateCredentials(id, data);
    if (result) return res.status(200).json({ success: result });
    return res
      .status(500)
      .json({ success: result, error: 'Internal Service Error' });
  }
}
