import useFetch from '@/libs/client/useFetch';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '../common';
import { IcoShare } from '../icons';

type FeedFormProps = {
	userId: number;
};

type PostInput = {
	content: string;
};

export default function FeedForm({ userId }: FeedFormProps) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { isValid },
	} = useForm<PostInput>();
	const { post } = useFetch(`/api/users/${userId}/posts`, {
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const onSubmit: SubmitHandler<PostInput> = async (data) => {
		await post(JSON.stringify(data));

		reset();
	};

	return (
		<section className='mx-auto h-52 max-w-4xl rounded border border-sns-grey-dark p-4 focus-within:border-sns-grey-light'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex h-full flex-col gap-y-4'
			>
				<textarea
					className='flex-1 resize-none border-none bg-transparent outline-none placeholder:text-sns-grey-light'
					placeholder='Share your thoughts...'
					{...register('content', {
						required: true,
					})}
				></textarea>
				<div className='flex items-center justify-end gap-x-4'>
					<Button icon={{ tail: <IcoShare /> }} disabled={!isValid}>
						Share
					</Button>
				</div>
			</form>
		</section>
	);
}
