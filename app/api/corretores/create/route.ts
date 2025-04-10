import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { nome, contato, email } = await request.json();

  try {
    const corretor = await prisma.corretor.create({
      data: { nome, contato, email },
    });
    return NextResponse.json(corretor);
  } catch (error) {
    console.error('Erro ao cadastrar corretor:', error);
    return NextResponse.json({ error: 'Erro ao cadastrar o corretor' }, { status: 500 });
  }
}
