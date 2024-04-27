import { Button, CustomLink, Divider, InputField } from '@/components';
import useFetch from '@/libs/client/useFetch';
import { Login } from '@/types/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

const URL = '/api/auth/login';

export default function Page() {
	const router = useRouter();
	const [errorMessage, setErrorMessage] = useState<string>();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Login>();
	const { fetchState, post } = useFetch(URL, {
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const onSubmit: SubmitHandler<Login> = async (data) => {
		console.log(data);

		await post(JSON.stringify(data));
	};

	useEffect(() => {
		if (!fetchState.isLoading) {
			if (fetchState.error) {
				setErrorMessage(fetchState.error.message);
			}
			if (fetchState.response) {
				router.push('/').catch(console.error);
			}
		}
	}, [router, fetchState]);

	return (
		<main className='flex h-screen justify-end'>
			<section className='flex flex-[0_0_50%] flex-col items-center justify-center rounded-tl-[100px] border border-black'>
				<div className='m-auto flex w-[260px] flex-col items-center justify-center'>
					<h1 className='mb-24 text-4xl font-bold'>Login</h1>
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
						<div className='mt-4 text-center'>
							{errorMessage && (
								<span className='text-xs text-red-400'>{errorMessage}</span>
							)}
							<Button disabled={fetchState.isLoading}>
								{fetchState.isLoading ? 'Loading...' : 'Login'}
							</Button>
						</div>
					</form>
					<Divider className='my-10' />
					<p className='mb-2 text-sm'>Don’t have an account?</p>
					<CustomLink href='/create-account'>Create account</CustomLink>
				</div>
			</section>
		</main>
	);
}
