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

self.addEventListener("periodicsync", async (event: any) => {
	if (event.tag === "birthday-reminder") {
		const data = await getTodaysBirthdays();
		const now = new Date();
		const bdays = data.filter((item) => {
			const bday = new Date(item.bday);
			return (
				now.getDate() === bday.getDate() &&
				now.getMonth() + 1 === bday.getMonth() + 1
			);
		});

		let body = "";

		bdays.forEach((bday, index) => {
			body += `${index + 1}. It's ${bday.firstName} ${bday.lastName} birthday`;
			body += "\n";
		});
		const title = `New Birthay`;
		const options = {
			body,
			icon: "/logo64.png",
		};

		self.registration.showNotification(title, options);
	}
});
