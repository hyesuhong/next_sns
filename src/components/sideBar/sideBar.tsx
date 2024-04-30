import useFetch from '@/libs/client/useFetch';
import { useRouter } from 'next/router';
import Divider from '../common/divider';
import { IcoHome, IcoLogOut, IcoProfile } from '../icons';
import NavItem from './navItem';

const URL = '/api/auth/logout';

export default function SideBar() {
	const router = useRouter();
	const { post } = useFetch(URL, {
		headers: { 'Content-type': 'application/json' },
	});

	const onLogoutClick = async () => {
		try {
			await post();
			await router.push('/log-in');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<aside className='sticky top-0 h-screen flex-[0_0_18rem] border-r border-r-sns-grey-dark px-4 py-6'>
			<h1 className='pl-4'>Logo</h1>
			<ul className='mt-10 flex flex-col gap-y-2'>
				<NavItem
					path='/'
					icon={<IcoHome />}
					label='Home'
					isActive={router.pathname === '/'}
				/>
				<Divider className='my-2' lightness='DARK' />
				<NavItem
					path='/users/1'
					icon={<IcoProfile />}
					label='My Profile'
					isActive={router.pathname === '/users/[id]'}
				/>
				<NavItem
					path=''
					icon={<IcoLogOut />}
					label='Log out'
					asButton
					onClick={onLogoutClick}
				/>
			</ul>
		</aside>
	);
}
