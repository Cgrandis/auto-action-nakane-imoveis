import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/autoaction/lib/prisma/autoaction';

export async function DELETE(request: NextRequest) {
    try {
      const { id } = await request.json();
      await prisma.portfolio.delete({ where: { id } });
      return NextResponse.json({ message: 'Serviço deletado com sucesso.' });
    } catch (error) {
      console.error('[API_DELETE_PORTFOLIO_ERROR]', error);
      return NextResponse.json({ error: 'Erro ao deletar serviço.' }, { status: 500 });
    }
  }