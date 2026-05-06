import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { name, email, phone, date, service, message } = await req.json();

  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: 'Top Gos <onboarding@resend.dev>',
    to: 'joshsendzulhall@gmail.com',
    replyTo: email,
    subject: `New booking request from ${name}`,
    text: [
      `Name:    ${name}`,
      `Email:   ${email}`,
      `Phone:   ${phone    || '—'}`,
      `Date:    ${date     || '—'}`,
      `Service: ${service  || '—'}`,
      '',
      message || '(no message)',
    ].join('\n'),
  });

  if (error) {
    console.error('[contact] Resend error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
