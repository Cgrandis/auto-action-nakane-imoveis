import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/autoaction/lib/prisma/autoaction';

export async function POST(request: NextRequest) {
  try {
    const { profession, title, description } = await request.json();

    if (!profession || !title || !description) {
      return NextResponse.json({ error: 'Todos os campos são obrigatórios.' }, { status: 400 });
    }

    const example = await prisma.example.create({
      data: {
        profession,
        title,
        description,
      },
    });

    return NextResponse.json(example, { status: 201 });
  } catch (error) {
    console.error('[API_CREATE_EXAMPLE_ERROR]', error);
    return NextResponse.json({ error: 'Erro ao criar exemplo.' }, { status: 500 });
  }
}
