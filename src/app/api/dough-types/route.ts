import prisma from '@/prisma/prisma-client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const doughTypes = await prisma.doughType.findMany();

    return NextResponse.json(doughTypes);
  } catch (error) {
    console.error('Error fetching dough types:', error);

    return NextResponse.json({ error: 'Failed to fetch dough types' }, { status: 500 });
  }
}
