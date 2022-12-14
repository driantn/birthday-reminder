import { values } from "idb-keyval";
import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";
import { clientsClaim } from "workbox-core";

type ItemType = {
	id: string;
	firstName: string;
	lastName: string;
	bday: string;
};

self.skipWaiting();
clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

const getTodaysBirthdays = async (): Promise<ItemType[]> => {
	if (!self.indexedDB) return [];
	const data = await values();
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

		if (!bdays.length) return;

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
