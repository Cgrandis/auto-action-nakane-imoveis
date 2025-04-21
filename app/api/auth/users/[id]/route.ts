import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma/auth';

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const userId = parseInt(params.id, 10);

  if (isNaN(userId)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  try {
    await prisma.usuario.delete({ where: { id: userId } });
    return NextResponse.json({ message: 'Usuário deletado com sucesso' });
  } catch (err) {
    return NextResponse.json({ error: 'Erro ao deletar usuário' }, { status: 500 });
  }
}
