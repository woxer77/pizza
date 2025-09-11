import { CART_TOKEN_COOKIE_NAME } from '@/constants/common';
import { calcCartItemPrice } from '@/helpers/cart.utils';
import prisma from '@/prisma/prisma-client';
import { NextResponse, type NextRequest } from 'next/server';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const token = request.cookies.get(CART_TOKEN_COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json({ error: 'Cart token not found' }, { status: 401 });
  }

  const data = (await request.json()) as { quantity: number };

  const cartItem = await prisma.cartItem.findUnique({
    where: {
      id: Number(id)
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
  });

  if (!cartItem) {
    return NextResponse.json({ error: 'Cart item not found' }, { status: 404 });
  }

  const updatedCartItem = await prisma.cartItem.update({
    where: {
      id: Number(id)
    },
    data: {
      quantity: data.quantity,
      totalPrice: calcCartItemPrice({
        product: cartItem.productVariation.product,
        ingredients: cartItem.ingredients,
        size: cartItem.productVariation.size,
        doughType: cartItem.productVariation.doughType,
        quantity: data.quantity
      })
    }
  });

  const cart = await prisma.cart.findUnique({
    where: {
      id: updatedCartItem.cartId
    },
    include: {
      items: {
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
    return NextResponse.json({ error: 'Cart not found' });
  }

  const totalPrice = cart.items.reduce((acc, item) => acc + item.totalPrice, 0);

  const updatedCart = await prisma.cart.update({
    where: {
      id: updatedCartItem.cartId
    },
    data: {
      totalPrice: totalPrice
    },
    include: {
      items: {
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

  return NextResponse.json(updatedCart);
}
