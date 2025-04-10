import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    
    const messages = await prisma.message.findMany({
      where: {
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar mensagens:', error);
    return new Response('Erro ao buscar mensagens', { status: 500 });
  }
}