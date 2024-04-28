import { PropsWithChildren } from 'react';
import { SideBar } from '../sideBar';

export default function GeneralLayout({ children }: PropsWithChildren) {
	return (
		<div className='flex min-h-screen bg-sns-charcoal text-sns-white'>
			<SideBar />
			<main className='flex-1 px-4 py-8'>{children}</main>
		</div>
	);
}
