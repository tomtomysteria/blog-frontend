import { NextResponse } from 'next/server';
import { removeStoredItemApiRoute } from '@/utils/cookiesUtils.server';

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  if (!key) {
    return NextResponse.json({ error: 'Missing key' }, { status: 400 });
  }

  return removeStoredItemApiRoute(key);
}
