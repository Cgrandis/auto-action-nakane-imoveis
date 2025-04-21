import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/nakaneimoveis/lib/prisma/nakane';

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
