import { AllowedMethods, CustomApiError } from '@/types/api';
import { RequestInit } from 'next/dist/server/web/spec-extension/request';
import { useCallback, useMemo, useState } from 'react';

type State<TResponse> = {
	response?: TResponse;
	isLoading: boolean;
	error?: { code?: number; message?: string };
};

const initialState = {
	isLoading: false,
};

export default function useFetch<TResponse, TRequest extends BodyInit = string>(
	url: string | URL | Request,
	options?: RequestInit
) {
	const [fetchState, setFetchState] = useState<State<TResponse>>(initialState);

	const memorizedUrl = useMemo(() => url, [url]);
	const memorizedOptions = useMemo(() => {
		if (!options) {
			return {
				headers: {
					'Content-Type': 'application/json',
				},
			};
		}

		const { headers, ...otherOptions } = options;
		const newOptions = {
			...otherOptions,
			headers: {
				...headers,
				'Content-Type': 'application/json',
			},
		};
		return newOptions;
	}, [options]);

	const handler = useCallback(
		async (method: AllowedMethods, data?: TRequest) => {
			setFetchState({ isLoading: true });
			const httpOption = data
				? { ...memorizedOptions, method, body: data }
				: { ...memorizedOptions, method };

			try {
				const res = await fetch(memorizedUrl, httpOption);

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
		},
		[memorizedOptions, memorizedUrl]
	);

	const handleGet = useCallback(() => handler('GET'), [handler]);

	const handlePost = useCallback(
		(reqData?: TRequest) => handler('POST', reqData),
		[handler]
	);

	const handleDelete = useCallback(() => handler('DELETE'), [handler]);

	return { fetchState, get: handleGet, post: handlePost, delete: handleDelete };
}
