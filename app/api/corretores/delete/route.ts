import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();

  try {
    const corretor = await prisma.corretor.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Corretor excluído com sucesso' });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao excluir o corretor' }, { status: 500 });
  }
}
