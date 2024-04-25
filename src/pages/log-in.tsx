import { Button, CustomLink, Divider, InputField } from '@/components';
import { SubmitHandler, useForm } from 'react-hook-form';

type LoginInputs = {
	email: string;
	password: string;
};

export default function Page() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginInputs>();

	const onSubmit: SubmitHandler<LoginInputs> = (data) => {
		console.log(data);
	};

	return (
		<main className='flex h-screen justify-end'>
			<section className='flex flex-[0_0_50%] flex-col items-center justify-center rounded-tl-[100px] border border-black'>
				<div className='m-auto flex w-[260px] flex-col items-center justify-center'>
					<h1 className='mb-24 text-4xl font-bold'>Login</h1>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='flex flex-col gap-4'
					>
						<InputField
							label='Email'
							name='email'
							required
							register={register}
							errorMessege={errors.email?.message}
						/>
						<InputField
							label='Password'
							name='password'
							type='password'
							required
							register={register}
							errorMessege={errors.password?.message}
						/>

						<Button className='mt-4'>Login</Button>
					</form>
					<Divider className='my-10' />
					<p className='mb-2 text-sm'>Don’t have an account?</p>
					<CustomLink href='/create-account'>Create account</CustomLink>
				</div>
			</section>
		</main>
	);
}
