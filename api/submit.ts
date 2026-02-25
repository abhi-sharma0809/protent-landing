import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';
const TO_EMAIL = ['srihan@protent.ai', 'abhi@protent.ai', 'hari@protent.ai'];

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set');
    return new Response(
      JSON.stringify({ error: 'Server misconfiguration: RESEND_API_KEY is not set' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await request.json() as { agency?: string; name?: string; email?: string; phone?: string; message?: string };
    const { agency, name, email, phone, message } = body;
    const messageTrimmed = typeof message === 'string' ? message.trim().slice(0, 200) : '';

    if (!agency?.trim() || !name?.trim() || !email?.trim()) {
      return new Response(
        JSON.stringify({ error: 'Agency, name, and work email are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const text = [
      'New Get Started form submission',
      '',
      `Agency: ${agency.trim()}`,
      `Name: ${name.trim()}`,
      `Work email: ${email.trim()}`,
      phone?.trim() ? `Phone: ${phone.trim()}` : null,
      messageTrimmed ? `Message: ${messageTrimmed}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: `Protent Get Started: ${name.trim()} (${agency.trim()})`,
      text,
    });

    if (error) {
      console.error('Resend error:', error);
      const msg = typeof error === 'object' && error !== null && 'message' in error ? String((error as { message?: string }).message) : '';
      const hint = /verify|domain|own email|recipients/i.test(msg)
        ? ' Verify a domain at resend.com/domains and set FROM_EMAIL to an address on that domain (e.g. form@protent.ai).'
        : '';
      return new Response(
        JSON.stringify({ error: 'Failed to send email' + hint, detail: msg || undefined }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    const err = e instanceof Error ? e : new Error(String(e));
    console.error('Submit error:', err.message, err.stack);
    return new Response(
      JSON.stringify({
        error: 'Invalid request or server error',
        detail: process.env.NODE_ENV === 'development' ? err.message : undefined,
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}
