import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient().$extends({
  result: {
    ingredient: {
      price: {
        needs: { price: true },
        compute: (row) => (row.price as Prisma.Decimal).toNumber()
      }
    },
    product: {
      basePrice: {
        needs: { basePrice: true },
        compute: (row) => (row.basePrice as Prisma.Decimal).toNumber()
      }
    },
    size: {
      price: {
        needs: { price: true },
        compute: (row) => (row.price as Prisma.Decimal).toNumber()
      }
    },
    doughType: {
      price: {
        needs: { price: true },
        compute: (row) => (row.price as Prisma.Decimal).toNumber()
      }
    },
    cart: {
      totalPrice: {
        needs: { totalPrice: true },
        compute: (row) => (row.totalPrice as Prisma.Decimal).toNumber()
      }
    },
    cartItem: {
      totalPrice: {
        needs: { totalPrice: true },
        compute: (row) => (row.totalPrice as Prisma.Decimal).toNumber()
      }
    },
    order: {
      totalPrice: {
        needs: { totalPrice: true },
        compute: (row) => (row.totalPrice as Prisma.Decimal).toNumber()
      }
    }
  }
});

export default prisma;
