import { CART_TOKEN_COOKIE_NAME } from '@/constants/common';
import { getCartByToken } from '@/services/db/carts';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get(CART_TOKEN_COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json({ items: [], totalPrice: 0 });
    }

    const cart = await getCartByToken(token);

    if (!cart) return NextResponse.json({ error: 'Cart not found' }, { status: 404 });

    return NextResponse.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);

    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}
