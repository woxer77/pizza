import prisma from './prisma-client';
import { hashSync } from 'bcrypt';

async function generate() {
  await prisma.user.createMany({
    data: [
      {
        firstName: 'User',
        secondName: 'Ivanov',
        address: 'Somewhere on the Earth 1',
        phone: '+380669948455',
        email: 'user@gmail.com',
        password: hashSync('qwerty', 10),
        verified: new Date()
      },
      {
        firstName: 'Admin',
        secondName: 'Danilov',
        address: 'Somewhere on the Earth 2',
        phone: '+380669948111',
        email: 'admin@gmail.com',
        password: hashSync('qwerty', 10),
        verified: new Date(),
        role: 'ADMIN'
      }
    ]
  });
}

async function clear() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await clear();
    await generate();
  } catch (error) {
    console.error(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
