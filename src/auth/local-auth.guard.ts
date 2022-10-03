import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // check the email and password
    await super.canActivate(context);

    // initialize session
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);

    // Allow access
    return true;
  }
}
