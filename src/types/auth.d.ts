type BaseAuth = {
	email: string;
	password: string;
};

export type Join = {
	name: string;
} & BaseAuth;

export type Login = BaseAuth;
