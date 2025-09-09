import prisma from '@/prisma/prisma-client';

const getCartByToken = async (token: string) => {
  const cart = await prisma.cart.findFirst({
    where: {
      token: parseInt(token)
    },
    include: {
      items: {
        orderBy: {
          createdAt: 'desc'
        },
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

/* const updateCartTotalPrice   = async (token: string) => {
  const cart = await prisma.cart.findFirst({
    where: {
      token: parseInt(token)
    },
    include: {
      items: {
        orderBy: {
          createdAt: 'desc'
        },
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

  if (!cart) return;

  const totalPrice = 

  return cart;
}; */

export { getCartByToken };
