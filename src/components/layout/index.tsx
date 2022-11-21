import { JSX } from "solid-js";

type Props = {
	children?: JSX.Element;
	classes?: string;
};

const Layout = ({ children, classes = "" }: Props) => {
	return <div class={`flex flex-col gap-3 p-2 ${classes}`}>{children}</div>;
};

export default Layout;
