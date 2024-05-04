import { Button, CustomLink, Divider, InputField } from '@/components/common';
import { EMAIL_REGEXP } from '@/constants/regExp';
import { apiRoutes, pageRoutes } from '@/constants/routes';
import AuthContainer from '@/containers/authContainer';
import useFetch from '@/libs/client/useFetch';
import { Login } from '@/types/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function Page() {
	const router = useRouter();
	const [errorMessage, setErrorMessage] = useState<string>();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Login>();
	const { fetchState, post } = useFetch(apiRoutes.LOGIN);

	const onSubmit: SubmitHandler<Login> = async (data) => {
		await post(JSON.stringify(data));
	};

	useEffect(() => {
		if (!fetchState.isLoading) {
			if (fetchState.error) {
				setErrorMessage(fetchState.error.message);
			}
			if (fetchState.response) {
				router.push(pageRoutes.MAIN.path).catch(console.error);
			}
		}
	}, [router, fetchState]);

	return (
		<AuthContainer title='Login'>
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
					label='Password'
					name='password'
					type='password'
					register={register}
					options={{
						required: 'Password id required.',
					}}
					errorMessege={errors.password?.message}
				/>
				<div className='mt-4 text-center'>
					{errorMessage && (
						<span className='text-xs text-sns-red'>{errorMessage}</span>
					)}
					<Button disabled={fetchState.isLoading} isFull>
						{fetchState.isLoading ? 'Loading...' : 'Login'}
					</Button>
				</div>
			</form>
			<Divider className='my-10' />
			<p className='mb-2 text-sm'>Don’t have an account?</p>
			<CustomLink href='/create-account'>Create account</CustomLink>
		</AuthContainer>
	);
}
