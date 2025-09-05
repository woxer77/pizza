import { getCartByToken } from '@/lib/carts';
import prisma from '@/prisma/prisma-client';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const requestToken = request.nextUrl.searchParams.get('token');
  const requestUserId = request.nextUrl.searchParams.get('userId');

  if (requestToken && !isNaN(parseInt(requestToken))) {
    const cart = await getCartByToken(requestToken);

    if (!cart) return NextResponse.json({ error: 'Cart not found' }, { status: 404 });

    return NextResponse.json(cart);
  } else if (requestUserId && !isNaN(parseInt(requestUserId))) {
    const cart = await prisma.cart.findFirst({
      where: {
        userId: parseInt(requestUserId)
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

    return NextResponse.json(cart);
  }
}
