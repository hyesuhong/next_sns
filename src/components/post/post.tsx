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
		`/api/posts/${id}`,
		fetcher
	);
	const likesUsers = data ? data.data.LikesOnPosts : LikesOnPosts;
	// console.log(data, data?.LikesOnPosts, LikesOnPosts);
	const ownerLiked = likesUsers.findIndex(
		(post) => post.userId === loggedInUserId
	);
	const {
		fetchState,
		post,
		delete: likeDelete,
	} = useFetch(`/api/posts/${id}/like`, {
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const onLikeClick = () => {
		if (ownerLiked > -1) {
			likeDelete();
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
				});
			}
		} else {
			post();
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
				});
			}
		}
	};

	return (
		<article className='p-4' data-post-id={id}>
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
			<div className='mb-6 ml-16 mt-3'>{content}</div>
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
