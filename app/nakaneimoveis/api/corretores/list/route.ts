import { NextResponse } from 'next/server';
import prisma from '@/app/nakaneimoveis/lib/prisma/nakane';

export async function GET() {
  try {
    const corretores = await prisma.corretor.findMany();
    return NextResponse.json(corretores);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao listar corretores' }, { status: 500 });
  }
}
