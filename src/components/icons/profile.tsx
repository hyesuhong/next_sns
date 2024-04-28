import type { SVGProps } from 'react';

export default function Profile(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='1em'
			height='1em'
			viewBox='0 0 24 24'
			{...props}
		>
			<path
				fill='none'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={2}
				d='M18 19c0-2.21-2.686-4-6-4s-6 1.79-6 4m6-7a4 4 0 1 1 0-8a4 4 0 0 1 0 8'
			></path>
		</svg>
	);
}
