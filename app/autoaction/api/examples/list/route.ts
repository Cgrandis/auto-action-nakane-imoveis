import { NextResponse } from 'next/server';
import prisma from '@/app/autoaction/lib/prisma/autoaction';

export async function GET() {
  try {
    const examples = await prisma.example.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(examples);
  } catch (error) {
    console.error('[API_LIST_EXAMPLES_ERROR]', error);
    return NextResponse.json({ error: 'Erro ao listar exemplos.' }, { status: 500 });
  }
}
