import prisma from '../../prisma/client';
import bcrypt from 'bcrypt';
import { redisClient } from '../redis/client';
import { Prisma } from '@prisma/client';
import { getCoordinates } from '../utils/getCoordinates';

const MAX_SESSIONS = 3;

async function registerCustomer(
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  password: string,
) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const customer = await prisma.customers.create({
      data: {
        firstName,
        lastName,
        phone,
        email,
        password: hashedPassword,
      },
    });

    return customer;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (
        error.code === 'P2002' &&
        (error.meta?.target as string[])?.includes('email')
      ) {
        throw new Error('A customer with this email already exists');
      }
    }
    throw error;
  }
}

async function registerRestaurant(
  name: string,
  email: string,
  phone: string,
  password: string,
  address: {
    street: string;
    city: string;
    zip: string;
  },
) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // get X and Y from address
    const { lon, lat } = await getCoordinates(address);

    const restaurant = await prisma.restaurants.create({
      data: {
        name,
        phone,
        email,
        password: hashedPassword,
        address: {
          create: {
            city: address.city,
            street: address.street,
            zip: address.zip,
            x: lon,
            y: lat,
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: {
          select: {
            city: true,
            street: true,
            zip: true,
            x: true,
            y: true,
          },
        },
        createdAt: true,
      },
    });

    return restaurant;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (
        error.code === 'P2002' &&
        (error.meta?.target as string[])?.includes('email')
      ) {
        throw new Error('A restaurant with this email already exists');
      }
    }
    throw error;
  }
}

async function login(email: string, password: string, rememberMe: boolean) {
  const customer = await prisma.customers.findUnique({
    where: { email },
  });

  const restaraunt = await prisma.restaurants.findUnique({
    where: { email },
  });

  const admin = await prisma.mTOGO_Admins.findUnique({
    where: { email },
  });

  let user;

  if (customer) {
    user = customer;
  } else if (restaraunt) {
    user = restaraunt;
  } else if (admin) {
    user = admin;
  } else {
    throw new Error('Invalid credentials');
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }

  const sessionTokenData = await manageUserSessions(
    user.id,
    rememberMe,
    user.role,
  );
  return sessionTokenData;
}

async function manageUserSessions(
  userId: string,
  rememberMe: boolean,
  userRole: string,
) {
  const sessionKey = `${userRole}-${userId}`;
  const customerSessions = await redisClient.lRange(sessionKey, 0, -1);

  // Remove the oldest session if the maximum number of sessions is reached
  if (customerSessions.length >= MAX_SESSIONS) {
    const oldestSessionToken = customerSessions[0];
    await redisClient.del(`userRole-${oldestSessionToken}`);
    await redisClient.lPop(sessionKey);
  }

  // Generate a new session token
  const sessionToken = crypto.randomUUID();
  const sessionTokenExpiry = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24; // 30 days or 1 day

  const sessionData = {
    userId,
    role: userRole,
    createdAt: new Date().toISOString(),
  };

  // Store the session token in Redis
  await redisClient.set(
    `${userRole}-SessionToken-${sessionToken}`,
    JSON.stringify(sessionData),
    {
      EX: sessionTokenExpiry,
    },
  );

  // Add the new session token to the customer's session list
  await redisClient.rPush(sessionKey, sessionToken);
  await redisClient.expire(sessionKey, sessionTokenExpiry);

  return { sessionToken, sessionTokenExpiry };
}

export { registerCustomer, registerRestaurant, login };
