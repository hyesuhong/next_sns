import { SideBar } from '@/components/sideBar';
import { User } from '@/types/auth';
import { PropsWithChildren } from 'react';

interface BasicContainer extends PropsWithChildren {
	user: User;
}

export default function BasicContainer({ children, user }: BasicContainer) {
	return (
		<div className='flex min-h-screen bg-sns-charcoal text-sns-white'>
			<SideBar user={user} />
			<main className='flex-1 px-4 py-8'>{children}</main>
		</div>
	);
}
