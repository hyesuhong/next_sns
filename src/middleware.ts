import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { SessionData, sessionOptions } from './libs/server/session';

export async function middleware(req: NextRequest) {
	const authSession = await getIronSession<SessionData>(
		cookies(),
		sessionOptions
	);

	if (
		req.nextUrl.pathname.startsWith('/create-account') ||
		req.nextUrl.pathname.startsWith('/log-in')
	) {
		if (authSession && authSession.isLoggedIn) {
			return NextResponse.redirect(new URL('/', req.url));
		}
	} else {
		if (!authSession || !authSession.isLoggedIn) {
			return NextResponse.redirect(new URL('/create-account', req.url));
		}
	}
}
