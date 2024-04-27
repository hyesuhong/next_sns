import { Button, CustomLink, Divider, InputField } from '@/components';
import useFetch from '@/libs/client/useFetch';
import { Join } from '@/types/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

const URL = '/api/auth/join';
const emailRegexp = /^\S+@\S+\.\S+$/;

export default function Page() {
	const router = useRouter();
	const [errorMessage, setErrorMessage] = useState<string>();
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<Join>();
	const { fetchState, post } = useFetch(URL, {
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const onSubmit: SubmitHandler<Join> = async (data) => {
		console.log(data);

		await post(JSON.stringify(data));
	};

	useEffect(() => {
		if (!fetchState.isLoading) {
			if (fetchState.error) {
				setErrorMessage(fetchState.error.message);
			}
			if (fetchState.response) {
				router.push('/log-in').catch(console.error);
			}
		}
	}, [fetchState, router]);

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
							register={register}
							options={{
								required: 'Email is required.',
								pattern: {
									value: emailRegexp,
									message:
										'Please write down correct email format(ex. example@mail.com)',
								},
							}}
							errorMessege={errors.email?.message}
						/>
						<InputField
							label='Name'
							name='name'
							register={register}
							options={{
								required: 'Name is required',
							}}
							errorMessege={errors.name?.message}
						/>
						<div className='mt-4 text-center'>
							{errorMessage && (
								<span className='text-xs text-red-400'>{errorMessage}</span>
							)}
							<Button disabled={fetchState.isLoading}>
								{fetchState.isLoading ? 'Loading...' : 'Create account'}
							</Button>
						</div>
					</form>
					<Divider className='my-10' />
					<p className='mb-2 text-sm'>Already have an account?</p>
					<CustomLink href='/log-in'>Login</CustomLink>
				</div>
			</section>
		</main>
	);
}
