import prisma from '@/libs/server/client';
import { getUserSession } from '@/libs/server/session';
import withHandler from '@/libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const {
		query: { id },
		method,
	} = req;

	const idToNum = Number(id);

	if (isNaN(idToNum)) {
		return res.status(403).json({ code: 403, message: 'Forbidden id type' });
	}

	const session = await getUserSession(req, res);

	if (!session.isLoggedIn || !session.user) {
		return res.status(401).json({ code: 401, message: 'Unauthorized' });
	}

	const user = await prisma.user.findUnique({
		where: { email: session.user.email },
	});

	const post = await prisma.post.findUnique({
		where: { id: idToNum },
	});

	if (!user || !post) {
		return res.status(404).json({ code: 404, message: 'Not Found' });
	}

	switch (method) {
		case 'POST': {
			const like = await prisma.likesOnPosts.create({
				data: {
					post: {
						connect: {
							id: post.id,
						},
					},
					user: {
						connect: {
							id: user.id,
						},
					},
				},
			});

			if (!like) {
				return res.status(400).json({ code: 400, message: 'Bad Request' });
			}

			const successRes = {
				data: { isLike: true },
				status: 201,
				statusText: 'new like',
			};

			return res.status(201).json(successRes);
		}
		case 'DELETE': {
			const like = await prisma.likesOnPosts.delete({
				where: {
					postId_userId: {
						postId: post.id,
						userId: user.id,
					},
				},
			});

			if (!like) {
				return res.status(400).json({ code: 400, message: 'Bad Request' });
			}

			const successRes = {
				data: { isLike: false },
				status: 204,
				statusText: '',
			};

			return res.status(204).json(successRes);
		}
	}
}

export default withHandler({ method: ['POST', 'DELETE'], handler });
