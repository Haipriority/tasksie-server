// auth/local-auth.guard.ts
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  // Authenticate only; do NOT create a session
  async canActivate(context: ExecutionContext) {
    return (await super.canActivate(context)) as boolean;
  }

  // Prevent AuthGuard from calling req.logIn (which needs express-session)
  async logIn(_request: any): Promise<void> {
    // no-op for stateless JWT
  }

  // Extra safety: tell passport not to use sessions
  getAuthenticateOptions() {
    return { session: false };
  }
}
