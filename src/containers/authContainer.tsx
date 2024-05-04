import { PropsWithChildren } from 'react';

interface AuthContainer extends PropsWithChildren {
	title: string;
}

export default function AuthContainer({ children, title }: AuthContainer) {
	return (
		<main className='flex h-screen justify-end bg-sns-charcoal'>
			<section className='flex flex-[0_0_50%] rounded-tl-[100px] bg-sns-grey-dark'>
				<div className='m-auto flex w-[260px] flex-col items-center justify-center text-sns-white'>
					<h1 className='mb-24 text-4xl font-bold'>{title}</h1>
					{children}
				</div>
			</section>
		</main>
	);
}
