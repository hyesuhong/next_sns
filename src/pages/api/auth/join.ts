import withHandler from '@/libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';

function handler(req: NextApiRequest, res: NextApiResponse) {
	const { name, email } = req.body;
	console.log(name, email);
	return res.status(200).json({ name, email });
}

export default withHandler({ method: 'POST', handler });
