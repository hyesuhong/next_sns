import { Divider } from '@/components/common';
import { GeneralLayout } from '@/components/layouts';
import { FeedForm, Post } from '@/components/post';
import useAuthSession from '@/libs/client/useAuthSession';

export default function Page() {
	const { user } = useAuthSession();

	return (
		<GeneralLayout>
			{user && <FeedForm userId={user.id} />}

			<section className='mx-auto mt-12 flex max-w-4xl flex-col gap-y-8'>
				<Post isOwner />
				<Divider lightness='DARK' />
				<Post />
			</section>
		</GeneralLayout>
	);
}
