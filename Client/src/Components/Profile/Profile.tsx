import { useEffect, useState } from "react";

export default function Profile() {
	const [name, setName] = useState("Name");
	const [email, setEmail] = useState("Email");

	useEffect(() => {
		const fetchUser = async () => {
			const response = await fetch("http://localhost:3000/user", {
				credentials: "include",
			});
			if (!response.ok) {
				throw new Error("Failed to fetch user profile data");
			}
			const profileData = await response.json();
			setName(profileData.name);
			setEmail(profileData.email);
		};
		fetchUser();
	});

	return (
		<div className="m-10">
			<h1 className="text-4xl font-bold">My Profile</h1>
			<div className="mb-6">
				<label
					htmlFor="large-input"
					className="block mt-6 mb-2 text-sm font-medium text-gray-900"
				>
					Name
				</label>
				<input
					type="text"
					id="large-input"
					className="block w-full p-4 placeholder-gray-500 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
					placeholder={name}
				/>
			</div>
			<div className="mb-6">
				<label
					htmlFor="large-input"
					className="block mb-2 text-sm font-medium text-gray-900"
				>
					Email
				</label>
				<input
					type="text"
					id="large-input"
					className="block w-full p-4 placeholder-gray-500 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
					placeholder={email}
				/>
				<button
					type="button"
					className=" rounded bg-green-500 px-4 py-2 mt-6 font-bold text-white hover:bg-green-700 focus:outline-none"
				>
					Save Profile
				</button>
			</div>
		</div>
	);
}
