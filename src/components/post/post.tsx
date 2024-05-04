import { apiRoutes } from '@/constants/routes';
import useFetch from '@/libs/client/useFetch';
import { PostType } from '@/types/post';
import Link from 'next/link';
import useSWR from 'swr';
import { Button, Profile } from '../common';
import { IcoEdit, IcoHeart, IcoTrash } from '../icons';

interface PostProps extends PostType {
	isOwner?: boolean;
	loggedInUserId: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Post({
	id,
	userId,
	content,
	createdAt,
	user,
	isOwner,
	_count,
	LikesOnPosts,
	loggedInUserId,
}: PostProps) {
	const { data, mutate } = useSWR<{ data: PostType }>(
		apiRoutes.A_POST_BY_ID.generator(id),
		fetcher
	);
	const likesUsers = data ? data.data.LikesOnPosts : LikesOnPosts;

	const ownerLiked = likesUsers.findIndex(
		(post) => post.userId === loggedInUserId
	);
	const { post, delete: likeDelete } = useFetch(
		apiRoutes.A_POST_BY_ID_LIKE.generator(id)
	);

	const onLikeClick = () => {
		if (ownerLiked > -1) {
			likeDelete().catch(console.error);
			if (data) {
				mutate({
					data: {
						...data.data,
						_count: { LikesOnPosts: data?.data._count.LikesOnPosts - 1 },
						LikesOnPosts: [
							...data.data.LikesOnPosts.slice(0, ownerLiked),
							...data.data.LikesOnPosts.slice(ownerLiked + 1),
						],
					},
				}).catch(console.error);
			}
		} else {
			post().catch(console.error);
			if (data) {
				mutate({
					data: {
						...data.data,
						_count: { LikesOnPosts: data?.data._count.LikesOnPosts + 1 },
						LikesOnPosts: [
							...data.data.LikesOnPosts,
							{ userId: loggedInUserId },
						],
					},
				}).catch(console.error);
			}
		}
	};

	return (
		<article className='rounded p-4 transition-colors hover:bg-sns-grey-dark'>
			<div className='flex items-center gap-x-2'>
				<Link href={`/users/${userId}`} className='flex items-center gap-x-4'>
					<Profile />
					<h4 className='text-xl'>{user.name}</h4>
				</Link>
				<span className='h-1 w-1 rounded-full bg-sns-grey-dark' />
				<p className='text-xs text-sns-grey-light'>
					{new Date(createdAt).toLocaleDateString('ko-KR')}
				</p>
			</div>
			<div className='mb-6 ml-16 mt-3'>
				<Link href={`/posts/${id}`}>{content}</Link>
			</div>
			<div className='ml-16 flex items-center justify-between'>
				<div className='flex gap-x-2'>
					<Button
						size='X_SMALL'
						variants='TERTIARY'
						icon={{ lead: <IcoHeart /> }}
						className={ownerLiked > -1 ? '!text-sns-red' : ''}
						onClick={onLikeClick}
					>
						{String(
							data ? data.data._count.LikesOnPosts : _count.LikesOnPosts
						).padStart(2, '0')}
					</Button>
				</div>
				{isOwner && (
					<div className='flex gap-x-2'>
						<Button
							size='X_SMALL'
							variants='TERTIARY'
							icon={{ lead: <IcoEdit /> }}
						></Button>
						<Button
							size='X_SMALL'
							variants='TERTIARY'
							icon={{ lead: <IcoTrash /> }}
						></Button>
					</div>
				)}
			</div>
		</article>
	);
}
