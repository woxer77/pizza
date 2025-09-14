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

const updateCartTotalPrice = async (token: string) => {
  const cart = await prisma.cart.findFirst({
    where: {
      token: Number(token)
    },
    include: {
      items: {
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          productVariation: {
            include: {
              product: true,
              size: true,
              doughType: true
            }
          },
          ingredients: true
        }
      }
    }
  });

  if (!cart) {
    return { error: 'Cart not found' };
  }

  const totalPrice = cart.items.reduce((acc, item) => acc + item.totalPrice, 0);

  const updatedCart = await prisma.cart.update({
    where: {
      id: cart.id
    },
    data: {
      totalPrice: totalPrice
    },
    include: {
      items: {
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          productVariation: {
            include: {
              product: true,
              size: true,
              doughType: true
            }
          },
          ingredients: true
        }
      }
    }
  });

  return updatedCart;
};

export { getCartByToken, updateCartTotalPrice };
