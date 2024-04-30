import client from '@/libs/server/client';
import withHandler from '@/libs/server/withHandler';
import { Join } from '@/types/auth';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';

interface JoinRequest extends NextApiRequest {
	body: Join;
}

async function handler(req: JoinRequest, res: NextApiResponse) {
	const { name, email, password } = req.body;

	const hashed = await bcrypt.hash(
		password,
		Number(process.env.BCRYPT_SALT_ROUNDS!)
	);

	await client.user.create({
		data: {
			name,
			email,
			password: hashed,
		},
	});

	const successRes = {
		data: { name, email },
		status: 201,
		statusText: 'Created',
	};

	return res.status(201).json(successRes);
}

export default withHandler({ method: 'POST', handler, isPrivate: false });
