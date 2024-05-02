export const pageRoutes = {
	MAIN: { path: '/', name: 'Home' },
	LOGIN: { path: '/log-in', name: 'Login' },
	JOIN: { path: '/create-account', name: 'Join' },
	A_POST: {
		name: 'Post',
		path: '/posts/[id]',
		generator: (id: number) => `/posts/${id}`,
	},
	USER_PROFILE: {
		name: 'Profile',
		path: '/users/[id]',
		generator: (id: number) => `/users/${id}`,
	},
};

export const apiRoutes = {
	JOIN: '/api/auth/join',
	LOGIN: '/api/auth/login',
	LOGOUT: '/api/auth/logout',
	ME: '/api/auth/me',
	ALL_POSTS: '/api/posts',
	A_POST_BY_ID: {
		path: '/api/posts/[id]',
		generator: (id: number) => `/api/posts/${id}`,
	},
	A_POST_BY_ID_LIKE: {
		path: '/api/posts/[id]/like',
		generator: (id: number) => `/api/posts/${id}/like`,
	},
	A_USERS_ALL_POSTS: {
		path: '/api/users/[id]/posts',
		generator: (id: number) => `/api/users/${id}/posts`,
	},
};
