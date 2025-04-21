import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (!token) return NextResponse.json({ error: 'Token ausente' }, { status: 401 });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      nome: string;
      email: string;
      slug: string;
    };

    return NextResponse.json(payload);
  } catch {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
  }
}
