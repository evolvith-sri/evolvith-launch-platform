import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { targetUrl, method = 'POST', headers = {}, body = '', confirmRemote = false } = await req.json();
    if (!targetUrl) {
      return NextResponse.json({ success: false, error: 'Target URL is required.' }, { status: 400 });
    }

    const isLocalhost =
      targetUrl.startsWith('http://localhost') ||
      targetUrl.startsWith('http://127.0.0.1') ||
      targetUrl.startsWith('http://[::1]') ||
      targetUrl.startsWith('https://localhost') ||
      targetUrl.startsWith('https://127.0.0.1');

    if (!isLocalhost && !confirmRemote) {
      return NextResponse.json(
        {
          success: false,
          error: 'NON_LOCALHOST_CONFIRMATION_REQUIRED',
          message: 'Target URL is not localhost. Explicit safety confirmation toggle required.'
        },
        { status: 400 }
      );
    }

    const startTime = Date.now();
    const cleanHeaders = { ...headers };
    delete cleanHeaders['host'];
    delete cleanHeaders['content-length'];

    try {
      const response = await fetch(targetUrl, {
        method: method.toUpperCase(),
        headers: cleanHeaders,
        body: ['GET', 'HEAD'].includes(method.toUpperCase()) ? undefined : typeof body === 'string' ? body : JSON.stringify(body)
      });

      const durationMs = Date.now() - startTime;
      const resText = await response.text();
      const resHeaders: Record<string, string> = {};
      response.headers.forEach((v, k) => {
        resHeaders[k] = v;
      });

      return NextResponse.json({
        success: true,
        statusCode: response.status,
        statusText: response.statusText,
        headers: resHeaders,
        body: resText,
        durationMs
      });
    } catch (fetchErr: any) {
      return NextResponse.json({
        success: false,
        error: 'CONNECTION_FAILED',
        message: fetchErr.message,
        durationMs: Date.now() - startTime
      });
    }
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
