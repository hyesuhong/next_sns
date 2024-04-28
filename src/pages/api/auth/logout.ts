import { getUserSession } from '@/libs/server/session';
import withHandler from '@/libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getUserSession(req, res);

	if (!session.isLoggedIn || !session.user) {
		return res.status(401).json({ code: 401, message: 'Unauthorized' });
	}

	session.destroy();

	const successRes = {
		status: 200,
		statusText: 'Success',
	};

	return res.status(200).json(successRes);
}

export default withHandler({ method: 'POST', handler });
