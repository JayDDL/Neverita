import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import type { AuthRequest, UserIdType } from "./types";
import type { Request, Response, NextFunction } from "express";

export const getEndDate = (startDate: Date) => {
	const endDate = new Date();
	endDate.setDate(startDate.getDate() + 7);
	return endDate;
};

export const currentTime = new Date()
	.toLocaleTimeString("en-GB", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false,
		timeZoneName: "short",
	})
	.replace(/ GMT.*/, "");

export const loggingMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	console.log(`${currentTime}: ${req.originalUrl}`);
	next();
};

export const authMiddleware = (
	req: AuthRequest,
	res: Response,
	next: NextFunction,
) => {
	const accessToken = req.cookies.access_token;
	const refreshToken = req.cookies.refresh_token;

	// If user is attempting to login - direct them straight & don't proceed further with the Authentication Middleware
	const publicPaths = ["/user/login", "/user/register"];
	if (publicPaths.includes(req.url)) return next();

	// If no refresh token - user needs to authenticate
	if (!refreshToken)
		return res.sendStatus(401).json({ message: "Authentication required" });

	try {
		if (accessToken) {
			const user = validateAccessToken(accessToken);
			if (user) {
				req.user = user.id;
				return next();
			}
		}
		const user = validateRefreshToken(refreshToken);
		if (!user)
			return res.sendStatus(401).json({ message: "Invalid refresh token" });
		const newAccessToken = generateAccessToken(user);
		res.cookie("access_token", newAccessToken, {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
			maxAge: 60 * 1000,
		});
		req.user = user.id;
		next();
	} catch (error) {
		console.error(`Authentication middleware failed: ${error}`);
		res.status(500).json({ message: "Internal server error" });
	}
};

const getAccessTokenSecret = () => {
	const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
	if (!ACCESS_TOKEN_SECRET) {
		throw new Error("Set ACCESS_TOKEN_SECRET in your .env file");
	}
	return ACCESS_TOKEN_SECRET;
};

const getRefreshTokenSecret = () => {
	const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
	if (!REFRESH_TOKEN_SECRET) {
		throw new Error("Set REFRESH_TOKEN_SECRET in your .env file");
	}
	return REFRESH_TOKEN_SECRET;
};

export const generateAccessToken = (user: UserIdType) => {
	let userData = user;
	if (user.iat && user.exp) {
		userData = {
			id: user.id,
		};
	}
	const ACCESS_TOKEN_SECRET = getAccessTokenSecret();
	const accessToken = jwt.sign(userData, ACCESS_TOKEN_SECRET, {
		expiresIn: "1m",
	});
	return accessToken;
};

export const generateRefreshToken = (user: UserIdType) => {
	const REFRESH_TOKEN_SECRET = getRefreshTokenSecret();
	const refreshToken = jwt.sign(user, REFRESH_TOKEN_SECRET, {
		expiresIn: "5m",
	});
	return refreshToken;
};

export const validateAccessToken = (accessToken: string) => {
	const ACCESS_TOKEN_SECRET = getAccessTokenSecret();
	let jwtVerifyResult = undefined;
	jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) {
			return;
		}
		jwtVerifyResult = user;
		return;
	});
	return jwtVerifyResult;
};

export const validateRefreshToken = (accessToken: string) => {
	const REFRESH_TOKEN_SECRET = getRefreshTokenSecret();
	let jwtVerifyResult = undefined;
	jwt.verify(accessToken, REFRESH_TOKEN_SECRET, (err, user) => {
		if (err) {
			return;
		}
		jwtVerifyResult = user;
		return;
	});
	return jwtVerifyResult;
};

export const hashPassword = async (password: string) => {
	return await bcrypt.hash(password, 5);
};

export const comparePassword = async (password: string, hash: string) => {
	return await bcrypt.compare(password, hash);
};
