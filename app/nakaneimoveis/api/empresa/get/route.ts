import { NextResponse } from 'next/server';
import prisma from '@/app/nakaneimoveis/lib/prisma/nakane';

export async function GET() {
  try {
    const empresa = await prisma.empresa.findFirst();
    if (!empresa) {
      return NextResponse.json(null); // explícito para evitar problemas no front
    }

    return NextResponse.json(empresa);
  } catch (error) {
    console.error('Erro ao buscar empresa:', error);
    return NextResponse.json({ error: 'Erro ao buscar os dados da empresa' }, { status: 500 });
  }
}
