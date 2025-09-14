import { CART_TOKEN_COOKIE_NAME } from '@/constants/common';
import { calcCartItemPrice } from '@/helpers/cart.utils';
import prisma from '@/prisma/prisma-client';
import { updateCartTotalPrice } from '@/services/db/carts';
import { NextResponse, type NextRequest } from 'next/server';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
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

    await prisma.cartItem.update({
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

    const updatedCart = await updateCartTotalPrice(token);

    return NextResponse.json(updatedCart);
  } catch (error) {
    console.log('[CART_ITEM_PATCH] Server error', error);
    return NextResponse.json({ message: 'Unable to update cart item' });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const token = req.cookies.get(CART_TOKEN_COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json({ error: 'Cart token not found' }, { status: 401 });
    }

    const cartItem = await prisma.cartItem.findUnique({
      where: {
        id: Number(id)
      }
    });

    if (!cartItem) return NextResponse.json({ error: 'Cart item with this id is not found' });

    await prisma.cartItem.delete({
      where: {
        id: Number(id)
      }
    });

    const updatedCart = await updateCartTotalPrice(token);

    return NextResponse.json(updatedCart);
  } catch (error) {
    console.log('[CART_ITEM_DELETE] Server error', error);
    return NextResponse.json({ message: 'Unable to delete cart item' });
  }
}
