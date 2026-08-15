import { NextResponse } from 'next/server';

/**
 * Giveaway entries are CLOSED (entries closed 27 June 2026, drawn 28 June).
 *
 * This endpoint used to forward to WIN_WEBHOOK_URL if that variable was set,
 * and return `{ok:true}` either way — so with the variable unset it accepted
 * name, email, phone and city and dropped every one of them while the page
 * said "You're in the draw!".
 *
 * It now refuses. 410 Gone is deliberate: any cached copy of the old client
 * gets a hard failure rather than a silent success. Do not restore the
 * accept-and-forward behaviour without a live draw AND a destination that is
 * verified to persist the entry.
 */
export async function POST() {
  return NextResponse.json(
    { ok: false, error: 'This giveaway has closed and is no longer accepting entries.' },
    { status: 410 }
  );
}
