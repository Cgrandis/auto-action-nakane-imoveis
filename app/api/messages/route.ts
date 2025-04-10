import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Obtém as mensagens do dia atual
    const messages = await prisma.message.findMany({
      where: {
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)), // Começo do dia atual
        },
      },
      orderBy: {
        createdAt: 'asc', // Ordena as mensagens do mais antigo para o mais recente
      },
    });

    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar mensagens:', error);
    return new Response('Erro ao buscar mensagens', { status: 500 });
  }
}