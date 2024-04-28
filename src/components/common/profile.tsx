import { IcoProfile } from '../icons';

type ProfileProps = {
	imgUrl?: string;
	className?: string;
};

export default function Profile({ imgUrl, className }: ProfileProps) {
	return (
		<span
			className={`flex h-12 w-12 overflow-hidden rounded-full border-2 border-sns-white ${className}`}
		>
			{imgUrl ? (
				<img src={imgUrl} alt='' className='h-full w-full object-cover' />
			) : (
				<IcoProfile className='m-auto h-4/5 w-4/5' />
			)}
		</span>
	);
}
