/* @refresh reload */
import { lazy, onMount } from "solid-js";
import { render } from "solid-js/web";
import { Routes, Route, Router } from "@solidjs/router";
import "./index.css";

const User = lazy(() => import("./routes/user"));
const Home = lazy(() => import("./routes/home"));

onMount(async () => {
	const registration = await navigator.serviceWorker.ready;
	// Check if periodicSync is supported
	if ("periodicSync" in registration) {
		// Request permission
		const status = await navigator.permissions.query({
			name: "periodic-background-sync" as any,
		});
		if (status.state === "granted") {
			try {
				// Register new sync every 24 hours
				await (registration as any).periodicSync.register("birthday-reminder", {
					minInterval: 24 * 60 * 60 * 1000, // 1 day
				});
				console.log("Periodic background sync registered!");
			} catch (e) {
				alert(`Periodic background sync failed:\nx${e}`);
			}
		} else {
			alert("Periodic background sync is not granted.");
		}
	} else {
		alert("Periodic background sync is not supported.");
	}

	const getNotificationPermission = () => {
		try {
			if (Notification.permission === "default") {
				Notification.requestPermission().then((permission) => {
					if (permission === "granted") {
						const title = "Birthday Reminder";
						const options = {
							body: "Notifications enabled",
							icon: "/logo64.png",
						};
						registration.showNotification(title, options);
					}
				});
			}
		} catch (e) {}
	};
	getNotificationPermission();
});

render(
	() => (
		<Router base={import.meta.env.BASE_URL}>
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
