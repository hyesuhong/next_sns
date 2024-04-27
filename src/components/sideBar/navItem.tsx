import Link from 'next/link';
import { ReactNode } from 'react';

type NavItemProps = {
	path: string;
	isActive?: boolean;
	icon: ReactNode;
	label: string;
};

export default function NavItem({ path, isActive, icon, label }: NavItemProps) {
	return (
		<li>
			<Link
				href={path}
				className={` flex h-12 items-center gap-x-2 rounded px-4 transition-colors [&>svg]:h-8 [&>svg]:w-8 ${isActive ? 'bg-sns-lavendar-light/70' : 'hover:bg-sns-white/20'}`}
			>
				{icon}
				<p>{label}</p>
			</Link>
		</li>
	);
}
