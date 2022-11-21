import { For } from "solid-js";
import Item, { type ItemType } from "./item";

type Props = {
	content: Array<ItemType>;
};

const List = (props: Props) => {
	return <For each={props.content}>{(item) => <Item content={item} />}</For>;
};

export default List;
