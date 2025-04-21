import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/nakaneimoveis/lib/prisma/nakane';

export async function POST(request: NextRequest) {
  const { nome, endereco, instagram } = await request.json();

  try {
    const existingEmpresa = await prisma.empresa.findFirst();
    if (existingEmpresa) {
      return NextResponse.json({ error: 'Uma empresa já está cadastrada' }, { status: 400 });
    }

    const empresa = await prisma.empresa.create({
      data: { nome, endereco, instagram },
    });

    return NextResponse.json(empresa);
  } catch (error) {
    console.error('Erro ao criar empresa:', error);
    return NextResponse.json({ error: 'Erro ao salvar os dados da empresa' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const { nome, endereco, instagram } = await request.json();

  try {
    const empresaExistente = await prisma.empresa.findFirst();
    if (!empresaExistente) {
      return NextResponse.json({ error: 'Empresa não encontrada para atualizar.' }, { status: 404 });
    }

    const empresa = await prisma.empresa.update({
      where: { id: empresaExistente.id },
      data: { nome, endereco, instagram },
    });

    return NextResponse.json(empresa);
  } catch (error) {
    console.error('Erro ao atualizar empresa:', error);
    return NextResponse.json({ error: 'Erro ao atualizar os dados da empresa' }, { status: 500 });
  }
}
