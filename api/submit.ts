import * as React from 'react';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';
const TO_EMAIL = ['srihan@protent.ai', 'abhi@protent.ai', 'hari@protent.ai'];

function GetStartedEmailTemplate({
  agency,
  name,
  email,
  phone,
  message,
}: {
  agency: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
}) {
  return React.createElement(
    'div',
    { style: { fontFamily: 'sans-serif', maxWidth: '600px' } },
    React.createElement('h1', { style: { fontSize: '18px' } }, 'New Get Started form submission'),
    React.createElement('p', null, React.createElement('strong', null, 'Agency: '), agency),
    React.createElement('p', null, React.createElement('strong', null, 'Name: '), name),
    React.createElement('p', null, React.createElement('strong', null, 'Work email: '), email),
    phone ? React.createElement('p', null, React.createElement('strong', null, 'Phone: '), phone) : null,
    message ? React.createElement('p', null, React.createElement('strong', null, 'Message: '), message) : null
  );
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function POST(request: Request) {
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

    const reactElement = React.createElement(GetStartedEmailTemplate, {
      agency: agency.trim(),
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || undefined,
      message: messageTrimmed || undefined,
    });

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: `Protent Get Started: ${name.trim()} (${agency.trim()})`,
      react: reactElement,
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
    console.error('Submit error:', e);
    return new Response(
      JSON.stringify({ error: 'Invalid request or server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}
