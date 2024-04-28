import { Method } from '@/types/api';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { getIronSession } from 'iron-session';
import { NextApiRequest, NextApiResponse } from 'next';
import prismaErrorHandler from './prismaErrorHandler';
import { SessionData, sessionOptions } from './session';

type ApiHandler = (
	req: NextApiRequest,
	res: NextApiResponse
) => void | Promise<void>;

type ConfigType = {
	method: Method | Method[];
	handler: ApiHandler;
	isPrivate?: boolean;
};

const notAllowedMethod = {
	code: 405,
	message: 'Method Not Allowed',
};

const unauthorized = {
	code: 401,
	message: 'Unauthorized',
};

const baseServerError = { code: 500, message: 'Internal Server Error' };

export default function withHandler({
	method,
	handler,
	isPrivate = true,
}: ConfigType) {
	return async function (req: NextApiRequest, res: NextApiResponse) {
		const session = await getIronSession<SessionData>(req, res, sessionOptions);
		const reqMethod = req.method as Method | undefined;
		const isValidMethod =
			reqMethod &&
			(typeof method === 'string'
				? reqMethod === method
				: method.includes(reqMethod));

		if (!isValidMethod) {
			return res.status(405).json(notAllowedMethod);
		}

		if (isPrivate && !session.isLoggedIn) {
			return res.status(401).json(unauthorized);
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
