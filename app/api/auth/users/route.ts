import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma/auth';
import bcrypt from 'bcryptjs';

export async function GET() {
  const usuarios = await prisma.usuario.findMany({
    select: { id: true, nome: true, email: true, contato: true, slug: true },
  });
  return NextResponse.json(usuarios);
}

export async function PUT(req: NextRequest) {
  const { id, nome, email, contato, slug, senha } = await req.json();

  if (!id || !nome || !email || !contato || !slug) {
    return NextResponse.json({ error: 'Todos os campos são obrigatórios.' }, { status: 400 });
  }

  const data: any = { nome, email, contato, slug };
  if (senha) {
    data.senha = await bcrypt.hash(senha, 10);
  }

  const usuario = await prisma.usuario.update({
    where: { id },
    data,
  });

  return NextResponse.json(usuario);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  if (!id) return NextResponse.json({ error: 'ID é obrigatório' }, { status: 400 });

  await prisma.usuario.delete({ where: { id } });
  return NextResponse.json({ message: 'Usuário deletado com sucesso.' });
}
