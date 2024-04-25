import { Button, CustomLink, Divider, InputField } from '@/components';
import useFetch from '@/libs/client/useFetch';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type JoinInputs = {
	email: string;
	name: string;
};

const URL = '/api/auth/join';

export default function Page() {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<JoinInputs>();
	const { fetchState, post } = useFetch<unknown>(URL, {
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const onSubmit: SubmitHandler<JoinInputs> = (data) => {
		console.log(data);

		post(JSON.stringify(data));
	};

	useEffect(() => {
		console.log(fetchState);
	}, [fetchState]);

	return (
		<main className='flex h-screen justify-end '>
			<section className='flex flex-[0_0_50%] rounded-tl-[100px] border border-black'>
				<div className='m-auto flex w-[260px] flex-col items-center justify-center'>
					<h1 className='mb-24 text-4xl font-bold'>Create account</h1>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='flex flex-col gap-3'
					>
						<InputField
							label='Email'
							name='email'
							required
							register={register}
							errorMessege={errors.email?.message}
						/>
						<InputField
							label='Name'
							name='name'
							required
							register={register}
							errorMessege={errors.name?.message}
						/>
						<Button className='mt-4'>Create account</Button>
					</form>
					<Divider className='my-10' />
					<p className='mb-2 text-sm'>Already have an account?</p>
					<CustomLink href='/log-in'>Login</CustomLink>
				</div>
			</section>
		</main>
	);
}
