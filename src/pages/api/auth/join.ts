import client from '@/libs/server/client';
import withHandler from '@/libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { name, email } = req.body;

	const user = await client.user.create({
		data: {
			name,
			email,
		},
	});
	return res.status(201).json({ name, email });
}

export default withHandler({ method: 'POST', handler });
