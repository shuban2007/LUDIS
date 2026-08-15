// Ludis — Transactional Email Service Abstraction
// Handles sending email invitations via dynamic endpoint routing or local logging fallback.

interface SendEmailParams {
  recipientName: string;
  recipientEmail: string;
  teamName: string;
  coachName: string;
  invitationUrl: string;
}

export interface SendEmailResult {
  success: boolean;
  mode: 'production' | 'demo';
  message: string;
  invitationUrl?: string;
}

export async function sendTeamInvitationEmail({
  recipientName,
  recipientEmail,
  teamName,
  coachName,
  invitationUrl,
}: SendEmailParams): Promise<SendEmailResult> {
  // Check if Resend private API key is configured (handled on server side only)
  const isProdConfigured = process.env.NEXT_PUBLIC_ENABLE_REAL_EMAIL === 'true' || process.env.RESEND_API_KEY;

  if (isProdConfigured) {
    try {
      const response = await fetch('/api/team-invitations/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipientName,
          recipientEmail,
          teamName,
          coachName,
          invitationUrl,
        }),
      });

      if (response.ok) {
        return {
          success: true,
          mode: 'production',
          message: 'Invitation email successfully sent via server API.',
        };
      }
    } catch (err) {
      console.error('Production email endpoint error, falling back to Demo Email Mode:', err);
    }
  }

  // Fallback: Demo Email Mode
  // Generate join link and log invitation parameters to local system output
  console.log('--- [DEMO EMAIL MODE] INVITATION INBOX ---');
  console.log(`To: ${recipientName} <${recipientEmail}>`);
  console.log(`Subject: You're invited to join ${teamName} on Ludis`);
  console.log(`Body: \nHi ${recipientName},\n\nCoach ${coachName} has invited you to join "${teamName}" on Ludis.\n\nLudis helps athletes and coaches understand performance, recovery, fatigue, and readiness.\n\nJOIN TEAM: ${invitationUrl}\n\nOr copy this link into your browser: ${invitationUrl}\n`);
  console.log('------------------------------------------');

  return {
    success: true,
    mode: 'demo',
    message: 'Invitation created. Demo join link generated.',
    invitationUrl,
  };
}
