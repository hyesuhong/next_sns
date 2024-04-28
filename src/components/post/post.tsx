import { Button, Profile } from '../common';
import { IcoChat, IcoEdit, IcoHeart, IcoTrash } from '../icons';

type PostProps = {
	isOwner?: boolean;
};

export default function Post({ isOwner }: PostProps) {
	return (
		<article className='p-4'>
			<div className='flex items-center gap-x-2'>
				<Profile />
				<h4 className='ml-2 text-xl'>Username</h4>
				<span className='h-1 w-1 rounded-full bg-sns-grey-dark' />
				<p className='text-xs text-sns-grey-light'>2024.00.00</p>
			</div>
			<div className='mb-6 ml-16 mt-3'>post main</div>
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
