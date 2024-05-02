import { User } from '@/types/auth';
import { PropsWithChildren } from 'react';
import { SideBar } from '../sideBar';

interface GeneralLayoutProps extends PropsWithChildren {
	user: User;
}

export default function GeneralLayout({ user, children }: GeneralLayoutProps) {
	return (
		<div className='flex min-h-screen bg-sns-charcoal text-sns-white'>
			<SideBar user={user} />
			<main className='flex-1 px-4 py-8'>{children}</main>
		</div>
	);
}
