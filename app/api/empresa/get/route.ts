import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const empresa = await prisma.empresa.findFirst(); // Encontra a primeira empresa cadastrada
    return NextResponse.json(empresa || {});
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar os dados da empresa' }, { status: 500 });
  }
}
