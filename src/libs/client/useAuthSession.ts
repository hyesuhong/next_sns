import { apiRoutes } from '@/constants/routes';
import useSWR from 'swr';
import { SessionData } from '../server/session';

type userSessionData = { data: SessionData['user'] };
type userSessionError = { code: number; message: string };

const fetcher = (url: string) =>
	fetch(url, { method: 'POST' }).then((res) => res.json());

export default function useAuthSession() {
	const { data, error } = useSWR<userSessionData, userSessionError>(
		apiRoutes.ME,
		fetcher
	);
	return { user: data?.data, error, isLoading: !data && !error };
}
