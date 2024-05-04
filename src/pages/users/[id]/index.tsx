import { Divider, Loading } from '@/components/common';
import { Post } from '@/components/post';
import { ProfileImage } from '@/components/user';
import { apiRoutes } from '@/constants/routes';
import BasicContainer from '@/containers/basicContainer';
import useAuthSession from '@/libs/client/useAuthSession';
import useFetch from '@/libs/client/useFetch';
import { PostType } from '@/types/post';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { Fragment, Suspense, useEffect, useState } from 'react';

type ResponseData = {
	data: PostType[];
};

export default function Page() {
	const { user } = useAuthSession();
	const {
		query: { id },
	} = useRouter();
	const userId = typeof id === 'string' ? parseInt(id) : undefined;
	const {
		fetchState: { response },
		get,
	} = useFetch<ResponseData>(
		apiRoutes.A_USERS_ALL_POSTS.generator(Number(userId))
	);
	const [isInitialRender, setIsInitialRender] = useState(true);

	useEffect(() => {
		if (id && isInitialRender) {
			setIsInitialRender(false);
			get().catch(console.error);
		}
	}, [id, get, isInitialRender]);

	return userId ? (
		<Suspense fallback={<Loading />}>
			{user && (
				<BasicContainer user={user}>
					<section className='mx-auto max-w-4xl overflow-hidden rounded border border-sns-grey-dark'>
						<div className='h-60 bg-sns-grey-dark'>
							{/* cover image area */}
						</div>
						<div className='relative p-4 pt-16'>
							<ProfileImage className='absolute left-4 top-0 h-28 w-28 -translate-y-2/3 bg-sns-charcoal' />
							<h2 className='mb-2 text-3xl'>Username</h2>
							<p>user description</p>
						</div>
					</section>
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
				</BasicContainer>
			)}
		</Suspense>
	) : (
		<Error statusCode={404} />
	);
}
