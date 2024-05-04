import { Button, CustomLink, Divider, InputField } from '@/components/common';
import { EMAIL_REGEXP } from '@/constants/regExp';
import { apiRoutes, pageRoutes } from '@/constants/routes';
import AuthContainer from '@/containers/authContainer';
import useFetch from '@/libs/client/useFetch';
import { Join } from '@/types/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

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
		<AuthContainer title='Create Account'>
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
							value: EMAIL_REGEXP,
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
		</AuthContainer>
	);
}
