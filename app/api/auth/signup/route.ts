import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma/auth';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  const { nome, email, contato, senha } = await req.json();

  if (!nome || !email || !contato || !senha) {
    return NextResponse.json({ error: 'Todos os campos são obrigatórios.' }, { status: 400 });
  }

  const existe = await prisma.usuario.findUnique({ where: { email } });

  if (existe) {
    return NextResponse.json({ error: 'E-mail já cadastrado.' }, { status: 409 });
  }

  const senhaCriptografada = await bcrypt.hash(senha, 10);

  const novoUsuario = await prisma.usuario.create({
    data: {
      nome,
      email,
      contato,
      senha: senhaCriptografada,
      slug: '',
    },
  });

  return NextResponse.json({ message: 'Usuário registrado com sucesso', usuario: novoUsuario });
}