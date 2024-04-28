import { PostType } from '@/types/post';
import Link from 'next/link';
import { Button, Profile } from '../common';
import { IcoChat, IcoEdit, IcoHeart, IcoTrash } from '../icons';

interface PostProps extends PostType {
	isOwner?: boolean;
}

export default function Post({
	id,
	userId,
	content,
	createdAt,
	user,
	isOwner,
}: PostProps) {
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
					>
						00
					</Button>
					<Button
						size='X_SMALL'
						variants='TERTIARY'
						icon={{ lead: <IcoChat /> }}
					>
						00
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
