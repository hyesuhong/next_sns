import { GeneralLayout } from '@/components/layouts';
import { Post } from '@/components/post';
import useAuthSession from '@/libs/client/useAuthSession';
import { PostType } from '@/types/post';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page() {
	const {
		query: { id },
	} = useRouter();
	const postId = id as string;
	const { user } = useAuthSession();
	const { data } = useSWR<{ data: PostType }>(`/api/posts/${postId}`, fetcher);

	return user ? (
		<GeneralLayout user={user}>
			{data && (
				<Post
					isOwner={user.id === data.data.userId}
					loggedInUserId={user.id}
					{...data.data}
				/>
			)}
		</GeneralLayout>
	) : null;
}
