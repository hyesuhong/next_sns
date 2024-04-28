import prisma from '@/libs/server/client';
import withHandler from '@/libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';

interface PostRequest extends NextApiRequest {
	body: { content: string };
}

async function handler(req: PostRequest, res: NextApiResponse) {
	const {
		body: { content },
		query: { id },
	} = req;

	const idToNum = Number(id);

	if (isNaN(idToNum)) {
		return res.status(403).json({ code: 403, message: 'Forbidden id type' });
	}

	const user = await prisma.user.findUnique({
		where: { id: idToNum },
	});

	if (!user) {
		return res.status(404).json({ code: 404, message: 'Not Found' });
	}

	const post = await prisma.post.create({
		data: {
			content,
			user: {
				connect: {
					id: user.id,
				},
			},
		},
	});

	if (!post) {
		return res.status(400).json({ code: 400, message: 'Bad Request' });
	}

	const successRes = {
		data: { ...post },
		status: 201,
		statusText: 'Created new post',
	};

	return res.status(201).json(successRes);
}

export default withHandler({ method: 'POST', handler });
