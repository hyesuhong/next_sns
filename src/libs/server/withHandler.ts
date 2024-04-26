import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextApiRequest, NextApiResponse } from 'next';
import prismaErrorHandler from './prismaErrorHandler';

type ApiHandler = (
	req: NextApiRequest,
	res: NextApiResponse
) => void | Promise<void>;

type ConfigType = {
	method: 'GET' | 'POST' | 'PUT' | 'DELETE';
	handler: ApiHandler;
};

const notAllowedMethod = {
	code: 405,
	message: 'Method Not Allowed',
};

const baseServerError = { code: 500, message: 'Internal Server Error' };

export default function withHandler({ method, handler }: ConfigType) {
	return async function (req: NextApiRequest, res: NextApiResponse) {
		if (req.method !== method) {
			return res.status(405).json(notAllowedMethod);
		}

		try {
			await handler(req, res);
		} catch (error) {
			console.error(error);

			if (error instanceof PrismaClientKnownRequestError) {
				return prismaErrorHandler(error, res);
			}
			return res.status(500).json(baseServerError);
		}
	};
}
