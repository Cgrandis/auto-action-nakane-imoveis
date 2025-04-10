import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();

  try {
    await prisma.empresa.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Empresa excluída com sucesso' });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao excluir a empresa' }, { status: 500 });
  }
}
