import { CustomApiError } from '@/types/api';
import { useState } from 'react';

type UseFetchParams = {
	headers: { [key: string]: string };
};

type State<TResponse> = {
	response?: TResponse;
	isLoading: boolean;
	error?: { code?: number; message?: string };
};

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const initialState = {
	isLoading: false,
};

export default function useFetch<TResponse, TRequest extends BodyInit = string>(
	url: string | URL | Request,
	options?: UseFetchParams
) {
	const [fetchState, setFetchState] = useState<State<TResponse>>(initialState);

	const handler = async (method: HttpMethod, data?: TRequest) => {
		setFetchState({ isLoading: true });
		const httpOption = data
			? { ...options, method, body: data }
			: { ...options, method };

		try {
			const res = await fetch(url, httpOption);

			if (!res.ok || res.status < 200 || res.status >= 300) {
				const errorData = (await res.json()) as CustomApiError;

				throw Error(errorData.message, {
					cause: { code: errorData.code, message: errorData.message },
				});
			}

			const resData = (await res.json()) as TResponse;
			setFetchState((prev) => ({
				...prev,
				error: undefined,
				response: resData,
			}));
		} catch (error) {
			// console.error(error);

			if (error instanceof Error) {
				const cause = error.cause as { code: number; message: string };
				setFetchState((prev) => ({
					...prev,
					response: undefined,
					error: cause,
				}));
			} else {
				setFetchState((prev) => ({
					...prev,
					response: undefined,
					error: { message: JSON.stringify(error) },
				}));
			}
		} finally {
			setFetchState((prev) => ({ ...prev, isLoading: false }));
		}
	};

	const handleGet = () => handler('GET');

	const handlePost = (reqData: TRequest) => handler('POST', reqData);

	return { fetchState, get: handleGet, post: handlePost };
}
