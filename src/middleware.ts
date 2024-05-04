import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { match } from 'path-to-regexp';
import { pageRoutes } from './constants/routes';
import { SessionData, sessionOptions } from './libs/server/session';

export const config = {
	matcher: ['/', '/log-in', '/create-account', '/posts/:id*', '/users/:id*'],
};

export async function middleware(req: NextRequest) {
	const {
		nextUrl: { pathname },
	} = req;
	const authSession = await getIronSession<SessionData>(
		cookies(),
		sessionOptions
	);

	const pageInfo = Object.values(pageRoutes).find((r) => {
		const regFn = match(r.path);
		return regFn(pathname) ? r : undefined;
	});

	if (!pageInfo) {
		return NextResponse.error();
	}

	if (pageInfo.isPrivate) {
		if (!authSession || !authSession.isLoggedIn) {
			return NextResponse.redirect(new URL('/create-account', req.url));
		}
	} else {
		if (authSession && authSession.isLoggedIn) {
			return NextResponse.redirect(new URL('/', req.url));
		}
	}
}
