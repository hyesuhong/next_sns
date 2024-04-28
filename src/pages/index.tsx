import { Divider } from '@/components/common';
import { GeneralLayout } from '@/components/layouts';
import { FeedForm, Post } from '@/components/post';
import useAuthSession from '@/libs/client/useAuthSession';
import useFetch from '@/libs/client/useFetch';
import { PostType } from '@/types/post';
import { Fragment, useEffect } from 'react';

type ResponseData = {
	data: PostType[];
};

const URL = '/api/posts';

export default function Page() {
	const { user } = useAuthSession();
	const {
		fetchState: { response },
		get,
	} = useFetch<ResponseData>(URL, {
		headers: {
			'Content-Type': 'application/json',
		},
	});

	useEffect(() => {
		if (user) {
			get().catch(console.error);
		}
	}, [user, get]);

	return (
		<GeneralLayout>
			{user && (
				<>
					<FeedForm userId={user.id} />
					<section className='mx-auto mt-12 flex max-w-4xl flex-col gap-y-8'>
						{response &&
							response.data.map((post, index, posts) => (
								<Fragment key={post.id}>
									<Post isOwner={user.id === post.userId} {...post} />
									{index !== posts.length - 1 && <Divider lightness='DARK' />}
								</Fragment>
							))}
					</section>
				</>
			)}
		</GeneralLayout>
	);
}
