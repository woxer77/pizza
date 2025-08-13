import prisma from '@/prisma/prisma-client';
import type { CategoryWithProducts } from '@/shared/types/category.interface';
import type { Category } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('include');
  let categories: Category[] | CategoryWithProducts[];

  if (query === 'products') {
    categories = await prisma.category.findMany({
      include: {
        products: {
          include: {
            ingredients: true,
            variations: true
          }
        }
      }
    });
  } else {
    categories = await prisma.category.findMany();
  }

  return NextResponse.json(categories);
}
