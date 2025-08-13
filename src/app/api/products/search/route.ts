import prisma from '@/prisma/prisma-client';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
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
}
