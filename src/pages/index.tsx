import { Divider } from '@/components/common';
import { GeneralLayout } from '@/components/layouts';
import { FeedForm, Post } from '@/components/post';

export default function Page() {
	return (
		<GeneralLayout>
			<FeedForm />
			<section className='mx-auto mt-12 flex max-w-4xl flex-col gap-y-8'>
				<Post isOwner />
				<Divider lightness='DARK' />
				<Post />
			</section>
		</GeneralLayout>
	);
}
