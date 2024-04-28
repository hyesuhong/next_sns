import type { SVGProps } from 'react';

export default function Share(props: SVGProps<SVGSVGElement>) {
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
				d='m10.308 13.692l4.846-4.846M20.11 5.89l-4.09 13.294c-.367 1.192-.55 1.788-.867 1.985a.999.999 0 0 1-.912.076c-.344-.143-.624-.7-1.182-1.816l-2.59-5.182a2.104 2.104 0 0 0-.193-.342a1.002 1.002 0 0 0-.18-.181a2.036 2.036 0 0 0-.331-.186L4.572 10.94c-1.115-.558-1.673-.837-1.816-1.181a1 1 0 0 1 .076-.913c.197-.316.793-.5 1.985-.867l13.295-4.09c.937-.289 1.405-.433 1.722-.316a1 1 0 0 1 .594.594c.116.316-.028.784-.316 1.72z'
			></path>
		</svg>
	);
}
