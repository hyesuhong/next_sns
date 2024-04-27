import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextApiResponse } from 'next';

type ErrorMetaData = {
	modelName: string;
	target: string[];
};

export default function prismaErrorHandler(
	error: PrismaClientKnownRequestError,
	res: NextApiResponse
) {
	// console.log({
	// 	code: error.code,
	// 	message: error.message,
	// 	meta: error.meta,
	// });

	switch (error.code) {
		case 'P2002': {
			const meta = error.meta as ErrorMetaData;

			return res.status(409).json({
				code: 409,
				message: meta
					? `This ${meta.target.join(', ')} already exists.`
					: 'This inputs already exist.',
			});
		}
	}
	return res.status(400).json({ code: 400, message: 'Bad Request' });
}
