import Link from 'next/link';

export default function Page() {
	return (
		<main className='flex h-screen justify-end'>
			<section className='flex flex-[0_0_50%] flex-col items-center justify-center rounded-tl-[100px] border border-black'>
				<h1 className='mb-24 text-4xl font-bold'>Login</h1>
				<form action='' className='flex flex-col gap-2'>
					<input type='text' name='email' placeholder='Email' />
					<input type='password' name='password' placeholder='Password' />
					<button className='mt-4'>Login</button>
				</form>
				<hr className='my-10 w-[260px] border-t border-t-black' />
				<p className='mb-2 text-sm'>Don’t have an account?</p>
				<Link href='/create-account'>Create account</Link>
			</section>
		</main>
	);
}
