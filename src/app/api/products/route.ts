import prisma from '@/prisma/prisma-client';
import type { Product } from '@/types/product.interface';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const products: Product[] = await prisma.product.findMany();

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error creating product:', error);

    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const product = await prisma.product.create({ data: body });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching categories:', error);

    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}
