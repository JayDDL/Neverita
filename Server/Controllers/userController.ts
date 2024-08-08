import type { Request, Response } from "express";
import {
	comparePassword,
	generateAccessToken,
	generateRefreshToken,
	hashPassword,
} from "../utils";
import {
	getUserModel,
	registerUserModel,
	userLoginModel,
} from "../models/userModels";


export const getUserController = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const userId = req.user;
		const user = await getUserModel(userId);
		const userProfileData = {
			name: user?.name,
			email: user?.email,
		};
		res.status(200).json(userProfileData);
	} catch (error) {
		const typedError = error as Error;
		res.status(500).json({ error: typedError.message });
	}
};

export const userLoginController = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const userData = await userLoginModel(email);
	if (!userData) return res.sendStatus(403);

	const isCorrectPassword = await comparePassword(
		password,
		userData.hashedPassword,
	);
	if (!isCorrectPassword) return res.sendStatus(403);

	const userId = {
		id: userData.id,
	};

	const accessToken = generateAccessToken(userId);
	const refreshToken = generateRefreshToken(userId);

	res
		.cookie("access_token", accessToken, {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
			maxAge: 60 * 10000,
		})
		.cookie("refresh_token", refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
			maxAge: 5 * 60 * 10000,
		})
		.header("Access-Control-Allow-Credentials", "true")
		.json({ status: "success" });
};

export const userRegisterController = async (req: Request, res: Response) => {
	const { name, email, password } = req.body;
	const hashedPassword = await hashPassword(password);
	const newUser = await registerUserModel(name, email, hashedPassword);

	const accessToken = generateAccessToken(newUser);
	const refreshToken = generateRefreshToken(newUser);

	res
		.cookie("access_token", accessToken, {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
			maxAge: 15 * 10000,
		})
		.cookie("refresh_token", refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
			maxAge: 60 * 10000,
		})
		.header("Access-Control-Allow-Credentials", "true")
		.json({ status: "success" });
};
