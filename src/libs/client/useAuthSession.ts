import useSWR from 'swr';
import { SessionData } from '../server/session';

type userSessionData = SessionData['user'];
type userSessionError = { code: number; message: string };

const fetcher = (url: string) =>
	fetch(url, { method: 'POST' }).then((res) => res.json());

export default function useAuthSession() {
	const { data, error } = useSWR<userSessionData, userSessionError>(
		'/api/auth/me',
		fetcher
	);
	return { user: data, error, isLoading: !data && !error };
}
