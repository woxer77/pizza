import { categories } from '@/constants/category.constants';
import prisma from './prisma-client';
import { hashSync } from 'bcrypt';
import { ingredients } from '@/constants/common';
import { products } from '@/constants/product.constants';
import { Prisma } from '@prisma/client';
import type { Prisma as PrismaType } from '@prisma/client';

type GenerateVariationType = (
  productId: number,
  sizeId?: 1 | 2 | 3 | 4,
  doughTypeId?: 1 | 2
) => PrismaType.ProductVariationUncheckedCreateInput;

const generateVariation: GenerateVariationType = (productId, sizeId, doughTypeId) => {
  return {
    productId,
    sizeId,
    doughTypeId
  };
};

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
    data: ingredients.map((ing) => {
      return { ...ing, price: new Prisma.Decimal(ing.price.toFixed(2)) };
    })
  });

  const createdIngredients = await prisma.ingredient.findMany({
    where: {
      name: {
        in: ingredients.map((elem) => elem.name)
      }
    },
    select: { id: true }
  });

  await prisma.product.createMany({
    data: products
  });

  await prisma.size.createMany({
    data: [
      {
        name: '20 cm',
        size: 20,
        price: 3
      },
      {
        name: '25 cm',
        size: 25,
        price: 5
      },
      {
        name: '30 cm',
        size: 30,
        price: 8
      },
      {
        name: '35 cm',
        size: 35,
        price: 12
      }
    ]
  });

  await prisma.doughType.createMany({
    data: [
      {
        name: 'traditional',
        price: 5
      },
      {
        name: 'thin',
        price: 6
      }
    ]
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: 'Cheese',
      description: 'Classic cheese pizza with stretchy mozzarella and house tomato sauce.',
      image: '/pizza/cheese.png',
      basePrice: 8.5,
      categoryId: 'pizza',
      ingredients: {
        connect: createdIngredients.slice(0, 5)
      }
    }
  });
  const pizza2 = await prisma.product.create({
    data: {
      name: 'Chorizo',
      description: 'Spicy chorizo slices, tomato sauce and mozzarella.',
      image: '/pizza/chorizo.png',
      basePrice: 9.5,
      categoryId: 'pizza',
      ingredients: {
        connect: createdIngredients.slice(5, 10)
      }
    }
  });
  const pizza3 = await prisma.product.create({
    data: {
      name: 'Double Chicken',
      description: 'Double portion of tender chicken, mozzarella and creamy sauce.',
      image: '/pizza/double-chicken.png',
      basePrice: 10.5,
      categoryId: 'pizza',
      ingredients: {
        connect: createdIngredients.slice(10, 13)
      }
    }
  });
  const pizza4 = await prisma.product.create({
    data: {
      name: 'Four Cheese',
      description: 'Blend of mozzarella, blue cheese, parmesan and cheddar.',
      image: '/pizza/four-cheese.png',
      basePrice: 10.0,
      categoryId: 'pizza',
      ingredients: {
        connect: createdIngredients.slice(10)
      }
    }
  });

  await prisma.productVariation.createMany({
    data: [
      generateVariation(pizza1.id, 1, 1),
      generateVariation(pizza1.id, 2, 1),
      generateVariation(pizza1.id, 3, 1),
      generateVariation(pizza1.id, 3, 2),
      generateVariation(pizza1.id, 4, 1),
      generateVariation(pizza1.id, 4, 2),

      generateVariation(pizza2.id, 1, 1),
      generateVariation(pizza2.id, 2, 1),
      generateVariation(pizza2.id, 3, 1),
      generateVariation(pizza2.id, 3, 2),

      generateVariation(pizza3.id, 2, 1),
      generateVariation(pizza3.id, 3, 1),
      generateVariation(pizza3.id, 3, 2),
      generateVariation(pizza3.id, 4, 1),
      generateVariation(pizza3.id, 4, 2),

      generateVariation(pizza4.id, 1, 1),
      generateVariation(pizza4.id, 2, 1),
      generateVariation(pizza4.id, 3, 1),
      generateVariation(pizza4.id, 3, 2),
      generateVariation(pizza4.id, 4, 1),

      generateVariation(1),
      generateVariation(2),
      generateVariation(3),
      generateVariation(4),
      generateVariation(5),
      generateVariation(6),
      generateVariation(7),
      generateVariation(8),
      generateVariation(9),
      generateVariation(10),
      generateVariation(11),
      generateVariation(12),
      generateVariation(13),
      generateVariation(14),
      generateVariation(15),
      generateVariation(16),
      generateVariation(17),
      generateVariation(18),
      generateVariation(19),
      generateVariation(20),
      generateVariation(21),
      generateVariation(22)
    ]
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        token: 123,
        totalPrice: 0
      },
      {
        userId: 2,
        token: 444,
        totalPrice: 0
      }
    ]
  });

  await prisma.cartItem.create({
    data: {
      cartId: 1,
      productVariationId: 1,
      quantity: 3,
      totalPrice: 33.3,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }]
      }
    }
  });
}

async function clear() {
  const tables = [
    'User',
    'Category',
    'Ingredient',
    'Product',
    'ProductVariation',
    'Size',
    'DoughType',
    'Cart',
    'CartItem'
  ] as const;

  for (const table of tables) {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE`);
  }
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
