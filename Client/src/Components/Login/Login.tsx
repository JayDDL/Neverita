import React, { useEffect, useState } from "react";
import logo from "../../assets/nver-logo.png";
import title from "../../assets/nver-title.png";
import { useNavigate } from "react-router-dom";

export const automaticLogin = async () => {
	const response = await fetch("http://localhost:3000/recipes", {
		credentials: "include",
	});
	return response;
};

export const Login = ({ setUserId }: { setUserId: (id: number) => void }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		automaticLogin()
			.then((response) => {
				if (response.ok) {
					setUserId(1);
					navigate("/view-recipes");
				}
			})
			.catch((err) => console.log("Not logged in!"));
	}, []);

	const handleLogin = async () => {
		try {
			const response = await fetch("http://localhost:3000/user/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
				credentials: "include",
			});
			if (response.ok) {
				await response.json();
				setUserId(1);
				navigate("/view-recipes");
			} else {
				console.error("Request Failed (NOT-OK): Login failed");
			}
		} catch (error) {
			console.error("Error during login:", error);
		}
	};

	return (
		<div className="align-center flex h-svh justify-center bg-gradient-to-br from-green-100 to-white antialiased">
			<div className="container mx-auto flex w-4/5 justify-center px-6">
				<div className="flex h-full flex-col justify-center gap-4 text-center md:items-center md:text-left">
					<div className="align-center p flex w-full flex-row justify-center py-10">
						<img src={title} className="w-5/5" alt="Logo" />
					</div>
					<div className="mx-auto w-full justify-center md:mx-0 md:w-full lg:w-9/12">
						<div className="flex w-full flex-col rounded-xl bg-white p-10 shadow-xl">
							<h2 className="mb-5 text-left text-2xl font-bold text-gray-800">
								Login
							</h2>
							<form className="w-full">
								<div id="input" className="my-5 flex w-full flex-col">
									<label
										htmlFor="username"
										className="mb-2 text-left text-gray-500"
									>
										Email
									</label>
									<input
										type="text"
										id="username"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="Please insert your email"
										className="appearance-none rounded-lg border-2 border-gray-100 px-4 py-3 placeholder-gray-300 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-600"
									/>
								</div>
								<div id="input" className="my-5 flex w-full flex-col">
									<label
										htmlFor="password"
										className="mb-2 text-left text-gray-500"
									>
										Password
									</label>
									<input
										type="password"
										id="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										placeholder="Please insert your password"
										className="appearance-none rounded-lg border-2 border-gray-100 px-4 py-3 placeholder-gray-300 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-600"
									/>
								</div>
								<div id="button" className="my-5 flex w-full flex-col">
									<button
										type="button"
										onClick={handleLogin}
										className="w-full rounded-lg bg-green-600 py-4 text-green-100"
									>
										<div className="flex flex-row items-center justify-center">
											<div className="mr-2">
												<svg
													className="h-6 w-6"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
													></path>
												</svg>
											</div>
											<div className="font-bold">Login</div>
										</div>
									</button>
									<div className="mt-5 flex justify-evenly">
										<a
											href="#"
											className="w-full text-center font-medium text-gray-500"
										>
											Recover password
										</a>
										<a
											href="#"
											className="w-full text-center font-medium text-gray-500"
										>
											Register
										</a>
									</div>
								</div>
							</form>
						</div>
						<div className="align-center p flex w-full flex-row justify-center pt-16">
							<img src={logo} className="w-1/5" alt="Logo" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
