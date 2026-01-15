import { NextRequest, NextResponse } from 'next/server';

// Form data type
interface FormData {
  charName: string;
  experience: 'yes' | 'no';
  motivation: string;
  discordUser: string;
  accept: boolean;
}

/**
 * API Route Handler for Form Submissions
 * Sends form data to Discord via webhook
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: FormData = await request.json();

    // Validate required fields
    if (!body.charName || !body.discordUser || !body.motivation || !body.experience) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    if (!body.accept) {
      return NextResponse.json(
        { error: 'Você deve aceitar os termos para continuar' },
        { status: 400 }
      );
    }

    // Get Discord webhook URL from environment variable
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error('DISCORD_WEBHOOK_URL não está configurado');
      return NextResponse.json(
        { error: 'Configuração do servidor incompleta' },
        { status: 500 }
      );
    }

    // Format the Discord embed message
    const discordPayload = {
      embeds: [
        {
          title: '🔥 NOVO RECRUTA - PHOENIX',
          color: 0x8B0000, // Dark red color matching Phoenix theme
          fields: [
            {
              name: '⚔️ Nome do Personagem',
              value: body.charName,
              inline: true,
            },
            {
              name: '💬 Discord',
              value: body.discordUser,
              inline: true,
            },
            {
              name: '🎮 Experiência Season 20+',
              value: body.experience === 'yes' ? '✅ Sim, sou veterano' : '❌ Não, busco glória',
              inline: false,
            },
            {
              name: '📜 Motivação',
              value: body.motivation.length > 1024 ? body.motivation.substring(0, 1021) + '...' : body.motivation,
              inline: false,
            },
          ],
          footer: {
            text: 'Formulário de Recrutamento Phoenix',
          },
          timestamp: new Date().toISOString(),
        },
      ],
    };

    // Send to Discord webhook
    const discordResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(discordPayload),
    });

    if (!discordResponse.ok) {
      const errorText = await discordResponse.text();
      console.error('Discord webhook error:', errorText);
      return NextResponse.json(
        { error: 'Erro ao enviar formulário. Tente novamente.' },
        { status: 500 }
      );
    }

    // Success response
    return NextResponse.json(
      { 
        success: true,
        message: 'Grito de Guerra enviado com sucesso! A PHOENIX entrará em contato.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing form submission:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
