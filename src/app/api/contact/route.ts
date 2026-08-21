import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const formId = process.env.FORMSPREE_FORM_ID;
  const { name, email, phone, date, service, message } = await req.json();

  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
  }

  if (!formId) {
    console.error('[contact] FORMSPREE_FORM_ID is not set.');
    return NextResponse.json({ error: 'Contact form is not configured.' }, { status: 500 });
  }

  const endpoint = formId.startsWith('http') ? formId : `https://formspree.io/f/${formId}`;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      phone: phone || '—',
      date: date || '—',
      service: service || '—',
      message: message || '(no message)',
      _subject: `New booking request from ${name}`,
    }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    console.error('[contact] Formspree error:', body);
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
