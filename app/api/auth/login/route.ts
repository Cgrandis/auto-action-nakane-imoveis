import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma/auth';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'chave-secreta-super-segura';

export async function POST(req: NextRequest) {
  const { email, senha } = await req.json();

  const user = await prisma.usuario.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 401 });
  }

  const senhaCorreta = await bcrypt.compare(senha, user.senha);
  if (!senhaCorreta) {
    return NextResponse.json({ error: 'Senha incorreta' }, { status: 401 });
  }

  const token = jwt.sign(
    { id: user.id, nome: user.nome, email: user.email, slug: user.slug },
    JWT_SECRET,
    { expiresIn: '1d' }
  );

  const response = NextResponse.json({
    message: 'Login efetuado com sucesso',
    usuario: { id: user.id, nome: user.nome, email: user.email, slug: user.slug }
  });

  response.cookies.set({
    name: 'token',
    value: token,
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24,
  });

  return response;
}
