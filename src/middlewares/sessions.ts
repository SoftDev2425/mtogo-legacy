import { Response, NextFunction } from 'express';
import { parse } from 'cookie';
import uuid from 'uuid';
import { redisClient } from '../redis/client';
import { CustomRequest } from '@/types/CustomRequest';

export const validateSession = async (
  req: CustomRequest,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const cookies = parse(req.headers.cookie || '');
    const sessionId = cookies.session;

    if (!sessionId) {
      throw new Error('Session ID is missing from cookies');
    }

    if (!uuid.validate(sessionId)) {
      throw new Error('Invalid session ID format');
    }

    const sessionData = await redisClient.get(`sessionToken-${sessionId}`);

    // TODO: Remove this console.log
    console.log('sessionData', sessionData);

    if (!sessionData) {
      throw new Error('Session not found or expired');
    }

    const parsedSessionData = JSON.parse(sessionData);

    req.email = parsedSessionData.email;
    req.userId = parsedSessionData.userId;
    req.role = parsedSessionData.role;

    next();
  } catch (error) {
    console.error('Error in session middleware:', error);
    next(error);
  }
};
