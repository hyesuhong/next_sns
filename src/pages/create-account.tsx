import Button from '@/components/button';
import CustomLink from '@/components/customLink';
import Divider from '@/components/divider';
import InputField from '@/components/inputField';

export default function Page() {
	return (
		<main className='flex h-screen justify-end '>
			<section className='flex flex-[0_0_50%] rounded-tl-[100px] border border-black'>
				<div className='m-auto flex w-[260px] flex-col items-center justify-center'>
					<h1 className='mb-24 text-4xl font-bold'>Create account</h1>
					<form action='' className='flex flex-col gap-2'>
						<InputField label='Email' name='email' />
						<InputField label='Password' name='password' type='password' />
						<InputField label='Name' name='name' />
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
