import { IcoProfile } from '../icons';

type ProfileProps = {
	imgUrl?: string;
};

export default function Profile({ imgUrl }: ProfileProps) {
	return (
		<span className='flex h-12 w-12 overflow-hidden rounded-full border-2 border-sns-white'>
			{imgUrl ? (
				<img src={imgUrl} alt='' className='h-full w-full object-cover' />
			) : (
				<IcoProfile className='m-auto h-10 w-10' />
			)}
		</span>
	);
}
