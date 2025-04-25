import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/autoaction/lib/prisma/autoaction';

export async function GET() {
    try {
      const dados = await prisma.portfolio.findMany({ orderBy: { criadoEm: 'desc' } });
      return NextResponse.json(dados);
    } catch (error) {
      console.error('[API_LIST_PORTFOLIO_ERROR]', error);
      return NextResponse.json({ error: 'Erro ao listar serviços.' }, { status: 500 });
    }
  }