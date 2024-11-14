import { Request, Response, NextFunction } from 'express';
import prisma from '../../prisma/client';

// Middleware to check if the user is an admin
const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  // Fetch user from database
  const user = await prisma.admins.findUnique({
    where: {
      email: email,
    },
  });

  // Check if user exists and has the "admin" role
  if (!user || user.role !== 'ADMIN') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Proceed if the user is an admin
  next();
};

export default isAdmin;
