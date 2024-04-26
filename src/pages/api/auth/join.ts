import client from '@/libs/server/client';
import withHandler from '@/libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';

type JoinParams = {
	name: string;
	email: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { name, email } = req.body as JoinParams;

	await client.user.create({
		data: {
			name,
			email,
		},
	});
	return res.status(201).json({ name, email });
}

export default withHandler({ method: 'POST', handler });
