import Button from '@/components/button';
import CustomLink from '@/components/customLink';
import Divider from '@/components/divider';
import InputField from '@/components/inputField';

export default function Page() {
	return (
		<main className='flex h-screen justify-end'>
			<section className='flex flex-[0_0_50%] flex-col items-center justify-center rounded-tl-[100px] border border-black'>
				<div className='m-auto flex w-[260px] flex-col items-center justify-center'>
					<h1 className='mb-24 text-4xl font-bold'>Login</h1>
					<form action='' className='flex flex-col gap-4'>
						<InputField label='Email' name='email' />
						<InputField label='Password' name='password' type='password' />

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
