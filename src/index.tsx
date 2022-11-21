/* @refresh reload */
import { lazy } from "solid-js";
import { render } from "solid-js/web";
import { Routes, Route, Router } from "@solidjs/router";
import "./index.css";

const User = lazy(() => import("./routes/user"));
const Home = lazy(() => import("./routes/home"));

render(
	() => (
		<Router>
			<Routes>
				<Route path="/user">
					<Route path="/" component={User} />
					<Route path="/:id" component={User} />
				</Route>
				<Route path="/" component={Home} />
			</Routes>
		</Router>
	),
	document.getElementById("root") as HTMLElement
);
