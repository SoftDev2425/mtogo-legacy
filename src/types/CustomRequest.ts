import { Request } from 'express';
import { Session } from 'express-session';

interface UserSession {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export interface CustomRequest extends Request {
  email?: string;
  role?: string;
  userId?: string;
  session: Session & UserSession;
}
