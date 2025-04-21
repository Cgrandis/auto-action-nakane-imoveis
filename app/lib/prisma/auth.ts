import { PrismaClient } from '@prisma/client-auth';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.AUTH_DATABASE_URL,
    },
  },
});

export default prisma;
