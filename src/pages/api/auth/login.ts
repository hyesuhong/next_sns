import withHandler from '@/libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';

function handler(req: NextApiRequest, res: NextApiResponse) {
	const { email } = req.body;
	console.log(email);
	return res.status(200).json({ email });
}

export default withHandler({ method: 'POST', handler });
