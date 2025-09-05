import prisma from '@/prisma/prisma-client';

const getCartByToken = async (token: string) => {
  const cart = await prisma.cart.findFirst({
    where: {
      token: parseInt(token)
    },
    include: {
      items: {
        include: {
          productVariation: {
            include: {
              product: true
            }
          },
          ingredients: true
        }
      }
    }
  });
  return cart;
};

export { getCartByToken };
