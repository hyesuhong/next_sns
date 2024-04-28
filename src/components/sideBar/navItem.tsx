import Link from 'next/link';
import { HTMLAttributes, ReactNode } from 'react';

interface NavItemProps extends HTMLAttributes<HTMLElement> {
	path: string;
	isActive?: boolean;
	icon: ReactNode;
	label: string;
	asButton?: boolean;
}

export default function NavItem({
	path,
	isActive,
	icon,
	label,
	asButton,
	onClick,
}: NavItemProps) {
	return (
		<li>
			{asButton ? (
				<button
					className='flex h-12 w-full items-center gap-x-2 rounded px-4 transition-colors hover:bg-sns-white/20 [&>svg]:h-8 [&>svg]:w-8'
					onClick={onClick}
				>
					{icon}
					<p>{label}</p>
				</button>
			) : (
				<Link
					href={path}
					className={`flex h-12 items-center gap-x-2 rounded px-4 transition-colors [&>svg]:h-8 [&>svg]:w-8 ${isActive ? 'bg-sns-lavendar-light/70' : 'hover:bg-sns-white/20'}`}
				>
					{icon}
					<p>{label}</p>
				</Link>
			)}
		</li>
	);
}
