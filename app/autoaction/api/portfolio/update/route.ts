// app/autoaction/api/portfolio/update/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/autoaction/lib/prisma/autoaction';

export async function PUT(req: NextRequest) {
  try {
    const { id, servico, descricao } = await req.json();

    if (!id || !servico || !descricao) {
      return NextResponse.json(
        { error: 'Todos os campos (id, serviço e descrição) são obrigatórios.' },
        { status: 400 }
      );
    }

    const updated = await prisma.portfolio.update({
      where: { id },
      data: {
        servico,
        descricao,
      },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error('[PORTFOLIO_UPDATE_ERROR]', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar o serviço no portfólio.' },
      { status: 500 }
    );
  }
}
