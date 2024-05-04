import { Loading } from '@/components/common';
import { Post } from '@/components/post';
import { apiRoutes } from '@/constants/routes';
import BasicContainer from '@/containers/basicContainer';
import useAuthSession from '@/libs/client/useAuthSession';
import { PostType } from '@/types/post';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { Suspense } from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page() {
	const {
		query: { id },
	} = useRouter();
	const postId = typeof id === 'string' ? parseInt(id) : undefined;
	const { user } = useAuthSession();
	const { data } = useSWR<{ data: PostType }>(
		apiRoutes.A_POST_BY_ID.generator(Number(postId)),
		fetcher
	);

	return postId ? (
		<Suspense fallback={<Loading />}>
			{user && (
				<BasicContainer user={user}>
					{data && (
						<Post
							isOwner={user.id === data.data.userId}
							loggedInUserId={user.id}
							{...data.data}
						/>
					)}
				</BasicContainer>
			)}
		</Suspense>
	) : (
		<Error statusCode={404} />
	);
}
