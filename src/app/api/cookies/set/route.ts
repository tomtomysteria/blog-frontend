import { NextResponse } from 'next/server';
import { setStoredItemApiRoute } from '@/utils/cookiesUtils.server';

export async function POST(request: Request) {
  const { key, value } = await request.json();

  if (!key || !value) {
    return NextResponse.json(
      { error: 'Missing key or value' },
      { status: 400 },
    );
  }

  return setStoredItemApiRoute(key, value);
}
