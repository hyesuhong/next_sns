import prisma from '@/libs/server/client';
import withHandler from '@/libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const {
		query: { id },
	} = req;

	const idToNum = Number(id);

	if (isNaN(idToNum)) {
		return res.status(403).json({ code: 403, message: 'Forbidden id type' });
	}

	const posts = await prisma.post.findUnique({
		where: {
			id: idToNum,
		},
		include: {
			_count: {
				select: {
					LikesOnPosts: true,
				},
			},
			user: {
				select: {
					name: true,
				},
			},
			LikesOnPosts: {
				select: {
					userId: true,
				},
			},
		},
	});

	if (!posts) {
		return res.status(404).json({ code: 404, message: 'Not Found' });
	}

	console.log(posts.LikesOnPosts);

	const successRes = {
		data: posts,
		status: 200,
		statusText: 'Success',
	};

	return res.status(200).json(successRes);
}

export default withHandler({ method: 'GET', handler });
