import { useState } from 'react';

type UseFetchParams = {
	headers: { [key: string]: string };
};

type State<TResponse> = {
	response?: TResponse;
	isLoading: boolean;
	error?: unknown;
};

const initialState = {
	isLoading: false,
};

export default function useFetch<TResponse, TRequest extends BodyInit = string>(
	url: string | URL | Request,
	options?: UseFetchParams
) {
	const [fetchState, setFetchState] = useState<State<TResponse>>(initialState);

	const handleGet = () => {
		setFetchState((prev) => ({ ...prev, isLoading: true }));

		fetch(url, { ...options, method: 'GET' })
			.then((res) => {
				if (res.ok && res.status >= 200 && res.status < 300) {
					console.log('success');
					return res.json() as TResponse;
				}

				throw Error('fetch response error');
			})
			.then((resData) => {
				console.log(resData);
				setFetchState((prev) => ({ ...prev, response: resData }));
			})
			.catch((error) => {
				console.error(error);
				setFetchState((prev) => ({ ...prev, error: error }));
			})
			.finally(() => {
				setFetchState((prev) => ({ ...prev, isLoading: false }));
			});
	};

	const handlePost = (data: TRequest) => {
		setFetchState((prev) => ({ ...prev, isLoading: true }));

		fetch(url, { ...options, method: 'POST', body: data })
			.then((res) => {
				if (res.ok && res.status >= 200 && res.status < 300) {
					console.log('success');
					return res.json() as TResponse;
				}

				throw Error('fetch response error');
			})
			.then((resData) => {
				console.log(resData);
				setFetchState((prev) => ({ ...prev, response: resData }));
			})
			.catch((error) => {
				console.error(error);
				setFetchState((prev) => ({ ...prev, error: error }));
			})
			.finally(() => {
				setFetchState((prev) => ({ ...prev, isLoading: false }));
			});
	};

	return { fetchState, get: handleGet, post: handlePost };
}
