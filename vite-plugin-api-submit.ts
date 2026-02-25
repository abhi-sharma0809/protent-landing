import type { Plugin } from 'vite';
import { Resend } from 'resend';

const TO_EMAIL = ['srihan@protent.ai', 'abhi@protent.ai', 'hari@protent.ai'];

function readBody(req: import('http').IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

export function apiSubmitPlugin(env: Record<string, string> = {}): Plugin {
  return {
    name: 'api-submit',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url !== '/api/submit' || req.method !== 'POST') return next();

        const apiKey = env.RESEND_API_KEY ?? process.env.RESEND_API_KEY;
        const fromEmail = env.FROM_EMAIL ?? process.env.FROM_EMAIL ?? 'onboarding@resend.dev';
        if (!apiKey) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'RESEND_API_KEY is not set. Add it to .env' }));
          return;
        }

        try {
          const raw = await readBody(req);
          const body = JSON.parse(raw || '{}') as { agency?: string; name?: string; email?: string; phone?: string; message?: string };
          const { agency, name, email, phone, message } = body;
          const messageTrimmed = typeof message === 'string' ? message.trim().slice(0, 200) : '';

          if (!agency?.trim() || !name?.trim() || !email?.trim()) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Agency, name, and work email are required' }));
            return;
          }

          const resend = new Resend(apiKey);
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
            from: fromEmail,
            to: TO_EMAIL,
            subject: `Protent Get Started: ${name.trim()} (${agency.trim()})`,
            text,
          });

          if (error) {
            console.error('[api/submit] Resend error:', error);
            const msg = typeof error === 'object' && error !== null && 'message' in error ? String((error as { message?: string }).message) : '';
            const hint = /verify|domain|own email|recipients/i.test(msg)
              ? ' Verify a domain at resend.com/domains and set FROM_EMAIL to an address on that domain (e.g. form@protent.ai).'
              : '';
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Failed to send email' + hint, detail: msg || undefined }));
            return;
          }

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: true }));
        } catch (e) {
          console.error('[api/submit] Error:', e);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid request or server error' }));
        }
      });
    },
  };
}
