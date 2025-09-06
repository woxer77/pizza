import prisma from '@/prisma/prisma-client';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get('query') || '';

    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive'
        }
      }
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error searching products:', error);

    return NextResponse.json({ error: 'Failed to search products' }, { status: 500 });
  }
}
