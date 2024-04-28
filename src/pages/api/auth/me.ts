import prisma from '@/libs/server/client';
import { getUserSession } from '@/libs/server/session';
import withHandler from '@/libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getUserSession(req, res);

	if (!session.isLoggedIn || !session.user) {
		return res.status(401).json({ code: 401, message: 'Unauthorized' });
	}

	const user = await prisma.user.findUnique({
		where: { email: session.user.email },
	});

	if (!user) {
		return res.status(404).json({ code: 404, message: 'Not Found' });
	}

	const successRes = {
		data: { ...session.user },
		status: 200,
		statusText: 'Success',
	};

	return res.status(200).json(successRes);
}

export default withHandler({ method: 'POST', handler });
