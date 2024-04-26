import withHandler from '@/libs/server/withHandler';
import { Login } from '@/types/auth';
import { NextApiRequest, NextApiResponse } from 'next';

interface LoginRequest extends NextApiRequest {
	body: Login;
}

function handler(req: LoginRequest, res: NextApiResponse) {
	const { email } = req.body;
	console.log(email);
	return res.status(200).json({ email });
}

export default withHandler({ method: 'POST', handler });
