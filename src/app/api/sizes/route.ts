import prisma from '@/prisma/prisma-client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const sizes = await prisma.size.findMany();

    return NextResponse.json(sizes);
  } catch (error) {
    console.error('Error fetching sizes:', error);

    return NextResponse.json({ error: 'Failed to fetch sizes' }, { status: 500 });
  }
}
