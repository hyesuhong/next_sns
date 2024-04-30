import client from '@/libs/server/client';
import { SessionData, sessionOptions } from '@/libs/server/session';
import withHandler from '@/libs/server/withHandler';
import { Login } from '@/types/auth';
import bcrypt from 'bcrypt';
import { getIronSession } from 'iron-session';
import { NextApiRequest, NextApiResponse } from 'next';

interface LoginRequest extends NextApiRequest {
	body: Login;
}

async function handler(req: LoginRequest, res: NextApiResponse) {
	const { email, password } = req.body;

	const session = await getIronSession<SessionData>(req, res, sessionOptions);

	const user = await client.user.findFirst({
		where: { email: email },
	});

	if (!user) {
		return res
			.status(401)
			.json({ code: 401, message: 'Invalid email or password' });
	}

	const isValidUser = await bcrypt.compare(password, user.password);

	if (!isValidUser) {
		return res
			.status(401)
			.json({ code: 401, message: 'Invalid email or password' });
	}

	const payload = Math.floor(100000 + Math.random() * 900000) + '';
	const token = await client.token.create({
		data: {
			payload,
			user: {
				connect: {
					id: user.id,
				},
			},
		},
	});

	if (!token) {
		return res.status(404).json({ code: 404, message: 'Cannot find token' });
	}

	session.user = {
		id: user.id,
		name: user.name,
		email: user.email,
	};
	session.isLoggedIn = true;
	await session.save();

	const successRes = {
		data: { email },
		status: 200,
		statusText: 'Success',
	};

	return res.status(200).json(successRes);
}

export default withHandler({ method: 'POST', handler, isPrivate: false });
