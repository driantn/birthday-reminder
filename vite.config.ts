import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => {
	return {
		plugins: [
			solidPlugin(),
			VitePWA({
				registerType: "autoUpdate",
				devOptions: {
					enabled: mode === "development",
				},
			}),
		],
		server: {
			port: 3000,
			host: "localhost",
		},
		build: {
			target: "esnext",
		},
	};
});
