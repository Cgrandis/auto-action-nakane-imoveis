import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
  const { id, nome, contato, email } = await request.json();

  try {
    const corretor = await prisma.corretor.update({
      where: { id },
      data: { nome, contato, email },
    });
    return NextResponse.json(corretor);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar o corretor' }, { status: 500 });
  }
}
