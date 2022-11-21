import { onMount, createSignal } from "solid-js";
import { values } from "idb-keyval";
import { useNavigate } from "@solidjs/router";
import Layout from "../../components/layout";
import List from "../../components/list";
import type { ItemType } from "../../components/list/item";

const Home = () => {
	const [state, setState] = createSignal<Array<ItemType>>([]);
	const navigate = useNavigate();
	onMount(async () => {
		const contents = await values();
		setState(contents);
	});

	const onClick = () => navigate("/user");

	return (
		<Layout classes="pb-[80px]">
			<List content={state()} />
			<button
				type="button"
				onClick={onClick}
				class="bg-slate-500 text-white font-bold p-3 fixed w-full bottom-0 left-0"
			>
				Add
			</button>
		</Layout>
	);
};

export default Home;
