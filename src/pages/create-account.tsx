import Link from 'next/link';

export default function Page() {
	return (
		<main className='flex h-screen justify-end '>
			<section className='flex flex-[0_0_50%] flex-col items-center justify-center rounded-tl-[100px] border border-black'>
				<h1 className='mb-24 text-4xl font-bold'>Create account</h1>
				<form action='' className='flex flex-col gap-2'>
					<input type='text' name='email' placeholder='Email' />
					<input type='password' name='password' placeholder='Password' />
					<input type='text' name='name' placeholder='Name' />
					<button className='mt-4'>Create account</button>
				</form>
				<hr className='my-10 w-[260px] border-t border-t-black' />
				<p className='mb-2 text-sm'>Already have an account?</p>
				<Link href='/log-in'>Login</Link>
			</section>
		</main>
	);
}
