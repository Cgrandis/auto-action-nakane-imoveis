import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/autoaction/lib/prisma/autoaction';

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'ID é obrigatório.' }, { status: 400 });
    }

    await prisma.example.delete({ where: { id } });

    return NextResponse.json({ message: 'Exemplo deletado com sucesso.' });
  } catch (error) {
    console.error('[API_DELETE_EXAMPLE_ERROR]', error);
    return NextResponse.json({ error: 'Erro ao deletar exemplo.' }, { status: 500 });
  }
}
