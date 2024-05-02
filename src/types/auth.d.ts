type BaseAuth = {
	email: string;
	password: string;
};

export type Join = {
	name: string;
} & BaseAuth;

export type Login = BaseAuth;

export type User = {
	id: number;
	name: string;
	email: string;
};
