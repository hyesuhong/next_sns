import { GeneralLayout } from '@/components/layouts';
import { FeedForm, Post } from '@/components/post';

export default function Page() {
	return (
		<GeneralLayout>
			<FeedForm />
			<section className='mx-auto mt-12 flex max-w-4xl flex-col'>
				<Post isOwner />
				<Post />
			</section>
		</GeneralLayout>
	);
}
