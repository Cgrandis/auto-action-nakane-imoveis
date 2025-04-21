import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const PUBLIC_PATHS = ['/login', '/api/auth/login', '/api/auth/signup'];

export function middleware(request: NextRequest) {
  const { pathname } = new URL(request.url);

  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get('token')?.value;

  if (!token) {
    console.warn('[Auth Middleware] Token ausente.');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    const slug = (payload as any).slug;
    const pathname = new URL(request.url).pathname;

    console.log(`[Middleware] pathname: ${pathname}, slug: ${slug}`);

    if (!pathname.startsWith(`/${slug}`)) {
      console.warn(`[Auth Middleware] Acesso negado: ${pathname} não começa com /${slug}`);
      return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error('[Auth Middleware] Erro ao verificar token:', err);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    // Aplica apenas nas rotas dos clientes (ex: /nakaneimoveis, /acmeimoveis etc.)
    '/(?!api|_next|favicon.ico|login|public|manifest).+',
  ],
};
