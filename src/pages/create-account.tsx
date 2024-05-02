import { Button, CustomLink, Divider, InputField } from '@/components/common';
import { apiRoutes, pageRoutes } from '@/constants/routes';
import useFetch from '@/libs/client/useFetch';
import { Join } from '@/types/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

const emailRegexp = /^\S+@\S+\.\S+$/;

export default function Page() {
	const router = useRouter();
	const [errorMessage, setErrorMessage] = useState<string>();
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<Join>();
	const { fetchState, post } = useFetch(apiRoutes.JOIN);

	const onSubmit: SubmitHandler<Join> = async (data) => {
		await post(JSON.stringify(data));
	};

	useEffect(() => {
		if (!fetchState.isLoading) {
			if (fetchState.error) {
				setErrorMessage(fetchState.error.message);
			}
			if (fetchState.response) {
				router.push(pageRoutes.LOGIN.path).catch(console.error);
			}
		}
	}, [fetchState, router]);

	return (
		<main className='flex h-screen justify-end bg-sns-charcoal'>
			<section className='flex flex-[0_0_50%] rounded-tl-[100px] bg-sns-grey-dark'>
				<div className='m-auto flex w-[260px] flex-col items-center justify-center text-sns-white'>
					<h1 className='mb-24 text-4xl font-bold'>Create account</h1>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='flex w-full flex-col gap-3'
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
						<InputField
							label='Password'
							name='password'
							type='password'
							register={register}
							options={{
								required: 'Password id required.',
								minLength: {
									value: 8,
									message: 'Password has to be at least 8 characters.',
								},
							}}
							errorMessege={errors.password?.message}
						/>
						<div className='mt-4 text-center'>
							{errorMessage && (
								<span className='text-xs text-sns-red'>{errorMessage}</span>
							)}
							<Button disabled={fetchState.isLoading} isFull>
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
