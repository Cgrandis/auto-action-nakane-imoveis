import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/autoaction/lib/prisma/autoaction';

export async function PUT(request: NextRequest) {
  try {
    const { id, profession, title, description } = await request.json();

    if (!id || !profession || !title || !description) {
      return NextResponse.json({ error: 'Todos os campos são obrigatórios.' }, { status: 400 });
    }

    const updated = await prisma.example.update({
      where: { id },
      data: { profession, title, description },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('[API_UPDATE_EXAMPLE_ERROR]', error);
    return NextResponse.json({ error: 'Erro ao atualizar exemplo.' }, { status: 500 });
  }
}
