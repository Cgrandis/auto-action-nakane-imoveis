import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/nakaneimoveis/lib/prisma/nakane';

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();

  try {
    await prisma.empresa.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: 'Empresa excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir empresa:', error);
    return NextResponse.json({ error: 'Erro ao excluir a empresa' }, { status: 500 });
  }
}
