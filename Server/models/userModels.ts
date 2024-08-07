import { prisma } from "./prisma";

export const getUserModel = async (id: number) => {
	return prisma.user.findUnique({
		where: {
			id,
		},
	});
};

export const registerUserModel = async (
	name: string,
	email: string,
	hashedPassword: string,
) => {
	return prisma.user.create({
		data: {
			name,
			email,
			hashedPassword,
		},
	});
};

export const userLoginModel = (email: string) => {
	return prisma.user.findUnique({
		where: {
			email,
		},
	});
};
