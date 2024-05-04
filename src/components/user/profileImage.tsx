import Image from 'next/image';
import { IcoProfile } from '../icons';

type ProfileProps = {
	imgUrl?: string;
	className?: string;
};

export default function ProfileImage({ imgUrl, className }: ProfileProps) {
	return (
		<span
			className={`flex h-12 w-12 overflow-hidden rounded-full border-2 border-sns-white ${className ? className : 'relative'}`}
		>
			{imgUrl ? (
				<Image src={imgUrl} alt='' fill className='object-cover' />
			) : (
				<IcoProfile className='m-auto h-4/5 w-4/5' />
			)}
		</span>
	);
}
