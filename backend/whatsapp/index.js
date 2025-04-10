const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const { gerarRespostaIA } = require('./handlers/localAIAssistant');

const client = new Client({
  authStrategy: new LocalAuth({ dataPath: './backend/whatsapp/session' }),
  puppeteer: {
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu',
    ],
  },
});

const qrPath = path.resolve(__dirname, 'qr.json');
const statusPath = path.resolve(__dirname, 'status.json');

client.on('ready', async () => {
  console.log('✅ WhatsApp Client is ready!');

  const info = client.info;

  const account = {
    number: info.wid.user,
    pushname: info.pushname,
    platform: info.platform,
  };

  fs.writeFileSync(statusPath, JSON.stringify({ connected: true }));

  const accountPath = path.resolve(__dirname, 'account.json');
  fs.writeFileSync(accountPath, JSON.stringify(account, null, 2));

  if (fs.existsSync(qrPath)) fs.unlinkSync(qrPath);

  try {
    const contacts = await client.getContacts();

    for (const contact of contacts) {
    
      if (contact.number && contact.number.trim()) {
        await prisma.contact.upsert({
          where: {
            number: contact.number,
          },
          update: {
            name: contact.pushname || 'Nome não disponível',
          },
          create: {
            number: contact.number,
            name: contact.pushname || 'Nome não disponível',
          },
        });
      }
    
    }

    console.log('✅ Contatos do WhatsApp salvos no banco de dados.');
  } catch (error) {
    console.error('Erro ao salvar contatos no banco de dados:', error);
  }
});

client.on('disconnected', (reason) => {
  console.log('🚫 Cliente desconectado:', reason);
});

client.on('qr', async (qr) => {
  const qrImage = await qrcode.toDataURL(qr);
  fs.writeFileSync(qrPath, JSON.stringify({ qr: qrImage }));
  fs.writeFileSync(statusPath, JSON.stringify({ connected: false }));
  console.log('📲 Novo QR code gerado.');
});

client.on('message', async (msg) => {
  const text = msg.body.trim();
  const user = msg.from;

  // 🧠 Obter resposta da IA com base no contexto e mensagem do cliente
  const resposta = await gerarRespostaIA(text);

  // ✉️ Enviar resposta
  await client.sendMessage(user, resposta);

  // 💾 Log das mensagens
  logMessage({
    timestamp: new Date().toISOString(),
    from: user,
    direction: 'received',
    body: text,
  });

  logMessage({
    timestamp: new Date().toISOString(),
    from: msg.to,
    direction: 'sent',
    body: resposta,
  });
});

async function logMessage(message) {
  try {
    await prisma.message.create({
      data: {
        from: message.from,
        to: message.from,
        direction: message.direction,
        body: message.body,
      },
    });
  } catch (error) {
    console.error('Erro ao salvar mensagem no banco de dados:', error);
  }
}

client.initialize();
