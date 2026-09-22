import { NextRequest, NextResponse } from 'next/server';
import dns from 'dns';
import { promisify } from 'util';

export const dynamic = 'force-dynamic';

const resolveMxAsync = promisify(dns.resolveMx);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const domain = String(body.domain || '').trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');

    if (!domain) {
      return NextResponse.json({ error: 'Domain is required for contact extraction.' }, { status: 400 });
    }

    let hasMx = false;
    let mxHosts: string[] = [];

    // Check MX records via DNS
    try {
      const records = await resolveMxAsync(domain);
      if (records && records.length > 0) {
        hasMx = true;
        mxHosts = records.map((r) => r.exchange);
      }
    } catch {
      hasMx = false;
    }

    // Heuristic standard business mailboxes
    const candidateEmails = [
      `contact@${domain}`,
      `info@${domain}`,
      `hello@${domain}`,
      `office@${domain}`,
      `support@${domain}`,
    ];

    const discoveredSocials = {
      linkedin: `https://www.linkedin.com/company/${domain.split('.')[0]}`,
      facebook: `https://www.facebook.com/${domain.split('.')[0]}`,
      instagram: `https://www.instagram.com/${domain.split('.')[0]}`,
      twitter: `https://x.com/${domain.split('.')[0]}`,
    };

    return NextResponse.json({
      success: true,
      domain,
      hasMxRecords: hasMx,
      mxHosts: mxHosts.slice(0, 3),
      primaryEmail: candidateEmails[0],
      candidateEmails,
      socials: discoveredSocials,
      confidenceScore: hasMx ? 95 : 70,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Extraction error: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}
