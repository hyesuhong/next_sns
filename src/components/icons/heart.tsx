import type { SVGProps } from 'react';

export default function Heart(props: SVGProps<SVGSVGElement>) {
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
				d='M12 7.694C10 3 3 3.5 3 9.5s9 11 9 11s9-5 9-11s-7-6.5-9-1.806'
			></path>
		</svg>
	);
}
