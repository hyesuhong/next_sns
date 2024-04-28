import prisma from '@/libs/server/client';
import withHandler from '@/libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const posts = await prisma.post.findMany({
		include: {
			user: {
				select: {
					name: true,
				},
			},
		},
	});

	if (!posts) {
		return res.status(404).json({ code: 404, message: 'Not Found' });
	}

	const successRes = {
		data: posts,
		status: 200,
		statusText: 'Success',
	};

	return res.status(200).json(successRes);
}

export default withHandler({ method: 'GET', handler });
