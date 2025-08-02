import prisma from '@/prisma/prisma-client';
import type { IProduct } from '@/shared/types/product.interface';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const product: Omit<IProduct, 'category'> = await prisma.product.create({ data: body }); // TODO: temp Omit

  return NextResponse.json(product);
}
