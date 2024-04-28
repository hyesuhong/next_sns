import { Button } from '../common';
import { IcoShare } from '../icons';

export default function FeedForm() {
	return (
		<section className='mx-auto h-52 max-w-4xl rounded border border-sns-grey-dark p-4 focus-within:border-sns-grey-light'>
			<form className='flex h-full flex-col gap-y-4'>
				<textarea
					className='flex-1 resize-none border-none bg-transparent outline-none placeholder:text-sns-grey-light'
					placeholder='Share your thoughts...'
				></textarea>
				<div className='flex items-center justify-end gap-x-4'>
					<p className='text-sm text-sns-grey-light'>0 / 108</p>
					<Button icon={{ tail: <IcoShare /> }}>Share</Button>
				</div>
			</form>
		</section>
	);
}
