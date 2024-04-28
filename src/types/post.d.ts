export type PostType = {
	id: number;
	content: string;
	createdAt: Date;
	updatedAt: Date;
	userId: number;
	user: {
		name: string;
	};
};
