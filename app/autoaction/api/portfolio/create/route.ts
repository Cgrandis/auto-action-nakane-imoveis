import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/autoaction/lib/prisma/autoaction';

export async function POST(request: NextRequest) {
  try {
    const { servico, descricao } = await request.json();

    if (!servico || !descricao) {
      return NextResponse.json({ error: 'Todos os campos são obrigatórios.' }, { status: 400 });
    }

    const novo = await prisma.portfolio.create({
      data: { servico, descricao },
    });

    return NextResponse.json(novo, { status: 201 });
  } catch (error) {
    console.error('[API_CREATE_PORTFOLIO_ERROR]', error);
    return NextResponse.json({ error: 'Erro ao criar serviço.' }, { status: 500 });
  }
}