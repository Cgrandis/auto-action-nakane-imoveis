import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
    return NextResponse.json({ error: 'Erro ao salvar os dados da empresa' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const { nome, endereco, instagram } = await request.json();

  try {
    const empresa = await prisma.empresa.update({
      where: { id: 1 }, // Assuming there's only one company
      data: { nome, endereco, instagram },
    });
    return NextResponse.json(empresa);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar os dados da empresa' }, { status: 500 });
  }
}
