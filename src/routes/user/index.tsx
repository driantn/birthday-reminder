import { onMount, createSignal } from "solid-js";
import { v4 as uuidv4 } from "uuid";
import { useParams, useNavigate } from "@solidjs/router";
import { get, set } from "idb-keyval";
import { ItemType } from "../../components/list/item";
import Layout from "../../components/layout";
import { dateParser } from "../../utils/dateParser";

const User = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [user, setUser] = createSignal<ItemType>();

	onMount(async () => {
		if (!params.id) return;
		const user = await get(params.id);
		setUser(user);
	});

	const onSubmit = (event: any) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const data = { ...user(), ...Object.fromEntries(formData) };
		if (!params.id) Object.assign(data, { id: uuidv4() });
		if (!data.firstName || !data.lastName) return alert("Please fill the data");
		set(`${data.id}`, data);
		navigate("/");
	};

	return (
		<Layout>
			<form onSubmit={onSubmit} class="flex flex-col gap-4">
				<label for="fname">First name:</label>
				<input
					type="text"
					id="fname"
					name="firstName"
					class="border border-gray-400 rounded-md p-2"
					value={user()?.firstName || ""}
				/>
				<label for="lname">Last name:</label>
				<input
					type="text"
					id="lname"
					name="lastName"
					class="border border-gray-400 rounded-md p-2"
					value={user()?.lastName || ""}
				/>
				<label for="bday">Choose the date</label>

				<input
					type="date"
					id="bday"
					name="bday"
					min={dateParser()}
					value={user()?.bday || dateParser()}
					class="border border-gray-400 rounded-md p-2"
				></input>
				<input
					type="submit"
					value="Save"
					class="p-2 bg-blue-400 hover:bg-blue-500 rounded-md text-white font-bold cursor-pointer"
				/>
			</form>
		</Layout>
	);
};

export default User;
