import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient({ log: ['error'] });
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient({ log: ['query', 'info', 'error', 'warn'] });
    }
    prisma = global.prisma;
}
export default prisma;
