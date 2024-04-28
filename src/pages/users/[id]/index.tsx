import { Divider, Profile } from '@/components/common';
import { GeneralLayout } from '@/components/layouts';
import { Post } from '@/components/post';

export default function Page() {
	return (
		<GeneralLayout>
			<section className='mx-auto max-w-4xl overflow-hidden rounded border border-sns-grey-dark'>
				<div className='h-60 bg-sns-grey-dark'>{/* cover image area */}</div>
				<div className='relative p-4 pt-16'>
					<Profile
						className='absolute left-4 top-0 h-28 w-28 -translate-y-2/3 bg-sns-charcoal'
						imgUrl='https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.553209589.1714176000&semt=ais'
					/>
					<h2 className='mb-2 text-3xl'>Username</h2>
					<p>user description</p>
				</div>
			</section>
			<section className='mx-auto mt-12 flex max-w-4xl flex-col gap-y-8'>
				<Post isOwner />
				<Divider lightness='DARK' />
				<Post isOwner />
			</section>
		</GeneralLayout>
	);
}
