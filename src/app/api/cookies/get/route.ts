import { NextResponse } from 'next/server';
import { getStoredItem } from '@/utils/cookiesUtils.server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  if (!key) {
    return NextResponse.json({ error: 'Missing key' }, { status: 400 });
  }

  const value = getStoredItem(key);

  return NextResponse.json({ value });
}
