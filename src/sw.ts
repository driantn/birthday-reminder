// import { values } from "https://cdn.jsdelivr.net/npm/idb-keyval@6/+esm";
// import { precacheAndRoute } from "workbox-precaching";

importScripts("https://cdn.jsdelivr.net/npm/idb-keyval@6/dist/umd.js");

type ItemType = {
	id: string;
	firstName: string;
	lastName: string;
	bday: string;
};

// precacheAndRoute(self.__WB_MANIFEST);

/* DONT REMOVE THIS CONSOLE.LOG FOR NOW
 * look at https://github.com/vite-pwa/vite-plugin-pwa/issues/302
 */
console.log(self.__WB_MANIFEST);

const getTodaysBirthdays = async (): Promise<ItemType[]> => {
	if (!self.indexedDB) return [];
	const data = await self.idbKeyval.values();
	return data;
};

const getDate = () =>
	new Date()
		.toLocaleDateString()
		.replaceAll("/", "-")
		.split("-")
		.reverse()
		.concat()
		.join("-");

self.addEventListener("periodicsync", async (event: any) => {
	console.log("log", event);
	if (event.tag === "birthday-reminder") {
		const data = await getTodaysBirthdays();
		const today = getDate();
		const bdays = data.filter((item) => item.bday === today);

		bdays.forEach((bday) => {
			const title = "New Birthay";
			const options = {
				body: `It's ${bday.firstName} ${bday.lastName} birthday`,
				icon: "/logo64.png",
			};
			self.registration.showNotification(title, options);
		});
	}
});
