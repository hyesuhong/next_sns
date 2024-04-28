export interface CustomApiResponsee<T = unknown> {
	data: T;
	status: number;
	statusText: string;
}

export interface CustomApiError extends Error {
	message?: string;
	code?: string;
}

export type Method =
	| 'CONNECT'
	| 'DELETE'
	| 'GET'
	| 'HEAD'
	| 'OPTIONS'
	| 'PATCH'
	| 'POST'
	| 'PUT'
	| 'TRACE';
