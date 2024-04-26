import { NextApiRequest, NextApiResponse } from 'next';

type ApiHandler = (
	req: NextApiRequest,
	res: NextApiResponse
) => void | Promise<void>;

type ConfigType = {
	method: 'GET' | 'POST' | 'PUT' | 'DELETE';
	handler: ApiHandler;
};

export default function withHandler({ method, handler }: ConfigType) {
	return async function (req: NextApiRequest, res: NextApiResponse) {
		if (req.method !== method) {
			return res.status(405).end();
		}

		try {
			await handler(req, res);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error });
		}
	};
}
