import Link from 'next/link';
import { PropsWithChildren } from 'react';

interface CustomLinkProps extends PropsWithChildren {
	href: string;
}

export default function CustomLink({ href, children }: CustomLinkProps) {
	return (
		<Link
			href={href}
			className='group flex items-center gap-x-1 text-sm text-violet-300'
		>
			{children}
			<span className='transition-transform group-hover:translate-x-1'>
				&rarr;
			</span>
		</Link>
	);
}
