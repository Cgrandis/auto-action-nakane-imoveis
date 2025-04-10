import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const corretores = await prisma.corretor.findMany();
    return NextResponse.json(corretores);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao listar corretores' }, { status: 500 });
  }
}
