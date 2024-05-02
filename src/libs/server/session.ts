import { User } from '@/types/auth';
import { SessionOptions, getIronSession } from 'iron-session';
import { NextApiRequest, NextApiResponse } from 'next';

export type SessionData = {
	isLoggedIn: boolean;
	user?: User;
};

export const sessionOptions: SessionOptions = {
	cookieName: 'next_sns_loggedin_session',
	password: process.env.IRON_SESSION_PASSWORD!,
};

export async function getUserSession(
	req: NextApiRequest,
	res: NextApiResponse
) {
	return await getIronSession<SessionData>(req, res, sessionOptions);
}
