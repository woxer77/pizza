import prisma from '@/prisma/prisma-client';
import { NextResponse } from 'next/server';

export async function GET() {
  const doughTypes = await prisma.doughType.findMany();

  return NextResponse.json(doughTypes);
}
