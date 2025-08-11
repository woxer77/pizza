import { categories } from '@/constants/category.constants';
import prisma from './prisma-client';
import { hashSync } from 'bcrypt';
import { ingredients } from '@/constants/common';
import { products } from '@/constants/product.constants';

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

  await prisma.category.createMany({
    data: categories
  });

  await prisma.ingredient.createMany({
    data: ingredients
  });

  await prisma.product.createMany({
    data: products
  });
}

async function clear() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
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
