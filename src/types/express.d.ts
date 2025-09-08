// src/types/express.d.ts
import type { JwtPayload } from '../auth/jwt-payload.type'; // adjust path

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload; // or `any` if you prefer
    }
  }
}

export {};
