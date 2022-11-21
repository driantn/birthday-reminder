import { useNavigate } from "@solidjs/router";
import { del } from "idb-keyval";

type Props = {
	content: ItemType;
};

export type ItemType = {
	id: string;
	firstName: string;
	lastName: string;
	bday: string;
};

const Item = (props: Props) => {
	const { content = null } = props;
	const navigate = useNavigate();
	let deleteRef: HTMLButtonElement;

	if (!content) return null;

	const { firstName, lastName, bday, id } = content;

	const onDelete = () => {
		console.log("log", content);
		if (deleteRef.classList.contains("verify")) {
			deleteRef.classList.remove("verify");
			deleteRef.style.backgroundColor = "#dc2626";
			return;
		}

		del(`${content.id}`).then(() => window.location.reload());
	};
	const onEdit = () => navigate(`/user/${id}`);

	return (
		<div class="flex flex-row gap-3 p-3 rounded-md border border-slate-200 items-center cursor-pointer hover:bg-slate-200 justify-start">
			<div class="uppercase text-lg font-bold w-[60px] h-[60px] flex flex-col items-center justify-center bg-sky-500 text-white rounded-full">{`${firstName?.[0]}${lastName?.[0]}`}</div>
			<div class="flex flex-col gap-2 p-2">
				<p>{`${firstName} ${lastName}`}</p>
				<p>{new Date(bday).toLocaleDateString()}</p>
			</div>
			<div class="flex flex-row gap-2 grow justify-end">
				<button
					type="button"
					onClick={onEdit}
					class="p-3 bg-sky-400 rounded-md text-white font-bold"
				>
					Edit
				</button>
				<button
					// @ts-ignore
					ref={deleteRef}
					type="button"
					onClick={onDelete}
					class="p-3 bg-orange-400 rounded-md text-white font-bold verify"
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default Item;
