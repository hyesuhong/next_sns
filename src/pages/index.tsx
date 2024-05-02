import { Divider } from '@/components/common';
import { GeneralLayout } from '@/components/layouts';
import { FeedForm, Post } from '@/components/post';
import { apiRoutes } from '@/constants/routes';
import useAuthSession from '@/libs/client/useAuthSession';
import useFetch from '@/libs/client/useFetch';
import { PostType } from '@/types/post';
import { Fragment, useEffect, useState } from 'react';

type ResponseData = {
	data: PostType[];
};

export default function Page() {
	const { user } = useAuthSession();
	const {
		fetchState: { response },
		get,
	} = useFetch<ResponseData>(apiRoutes.ALL_POSTS);
	const [isInitialRender, setIsInitialRender] = useState(true);

	useEffect(() => {
		if (user && isInitialRender) {
			setIsInitialRender(false);
			get().catch(console.error);
		}
	}, [user, get, isInitialRender]);

	return user ? (
		<GeneralLayout user={user}>
			{user && (
				<>
					<FeedForm userId={user.id} />
					<section className='mx-auto mt-12 flex max-w-4xl flex-col gap-y-8'>
						{response &&
							response.data.map((post, index, posts) => (
								<Fragment key={post.id}>
									<Post
										isOwner={user.id === post.userId}
										loggedInUserId={user.id}
										{...post}
									/>
									{index !== posts.length - 1 && <Divider lightness='DARK' />}
								</Fragment>
							))}
					</section>
				</>
			)}
		</GeneralLayout>
	) : null;
}
