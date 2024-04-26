import client from '@/libs/server/client';
import withHandler from '@/libs/server/withHandler';
import { Join } from '@/types/auth';
import { NextApiRequest, NextApiResponse } from 'next';

interface JoinRequest extends NextApiRequest {
	body: Join;
}

async function handler(req: JoinRequest, res: NextApiResponse) {
	const { name, email } = req.body;

	await client.user.create({
		data: {
			name,
			email,
		},
	});
	return res.status(201).json({ name, email });
}

export default withHandler({ method: 'POST', handler });
