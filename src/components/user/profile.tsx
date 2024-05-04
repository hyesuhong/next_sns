import ProfileImage from './profileImage';

export default function Profile() {
	return (
		<section className='mx-auto max-w-4xl overflow-hidden rounded border border-sns-grey-dark'>
			<div className='h-60 bg-sns-grey-dark'>{/* cover image area */}</div>
			<div className='relative p-4 pt-16'>
				<ProfileImage className='absolute left-4 top-0 h-28 w-28 -translate-y-2/3 bg-sns-charcoal' />
				<h2 className='mb-2 text-3xl'>Username</h2>
				<p>user description</p>
			</div>
		</section>
	);
}
