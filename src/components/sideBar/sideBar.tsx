import { apiRoutes, pageRoutes } from '@/constants/routes';
import useFetch from '@/libs/client/useFetch';
import { User } from '@/types/auth';
import { useRouter } from 'next/router';
import Divider from '../common/divider';
import { IcoHome, IcoLogOut, IcoProfile } from '../icons';
import NavItem from './navItem';

interface SideBarProps {
	user: User;
}

export default function SideBar({ user }: SideBarProps) {
	const router = useRouter();
	const { post } = useFetch(apiRoutes.LOGOUT);
	const userProfilePath = pageRoutes.USER_PROFILE.generator(user.id);

	const onLogoutClick = async () => {
		try {
			await post();
			await router.push(pageRoutes.LOGIN.path);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<aside className='sticky top-0 h-screen flex-[0_0_18rem] border-r border-r-sns-grey-dark px-4 py-6'>
			<h1 className='pl-4'>Logo</h1>
			<ul className='mt-10 flex flex-col gap-y-2'>
				<NavItem
					path={pageRoutes.MAIN.path}
					icon={<IcoHome />}
					label={pageRoutes.MAIN.name}
					isActive={router.pathname === pageRoutes.MAIN.path}
				/>
				<Divider className='my-2' lightness='DARK' />
				<NavItem
					path={userProfilePath}
					icon={<IcoProfile />}
					label='My Profile'
					isActive={router.asPath === userProfilePath}
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
