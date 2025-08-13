import prisma from '@/prisma/prisma-client';
import type { Product } from '@/types/product.interface';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const products: Product[] = await prisma.product.findMany();

  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const product = await prisma.product.create({ data: body });

  return NextResponse.json(product);
}
