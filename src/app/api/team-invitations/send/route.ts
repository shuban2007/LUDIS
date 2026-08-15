import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { recipientName, recipientEmail, teamName, coachName, invitationUrl } = await request.json();

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Mail delivery key not configured on server.' },
        { status: 500 }
      );
    }

    // Call Resend standard API endpoint
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'Ludis Team <invitations@ludis.app>',
        to: recipientEmail,
        subject: `You're invited to join ${teamName} on Ludis`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
            <h1 style="color: #0f766e;">LUDIS</h1>
            <p>Hi <strong>${recipientName}</strong>,</p>
            <p>Coach <strong>${coachName}</strong> has invited you to join: <strong>${teamName}</strong> on Ludis.</p>
            <p>Ludis helps athletes and coaches understand performance, recovery, fatigue and readiness.</p>
            <div style="margin: 30px 0; text-align: center;">
              <a href="${invitationUrl}" style="background-color: #0f766e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">JOIN TEAM</a>
            </div>
            <p style="font-size: 12px; color: #666;">Or copy this link into your browser: <br/> ${invitationUrl}</p>
          </div>
        `,
      }),
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    }

    const errorDetails = await response.text();
    return NextResponse.json(
      { error: `Resend API failed: ${errorDetails}` },
      { status: 502 }
    );
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json(
      { error: errMsg },
      { status: 500 }
    );
  }
}
