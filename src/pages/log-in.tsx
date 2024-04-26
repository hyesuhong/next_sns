import { Button, CustomLink, Divider, InputField } from '@/components';
import { Login } from '@/types/auth';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function Page() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Login>();

	const onSubmit: SubmitHandler<Login> = (data) => {
		console.log(data);
	};

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
