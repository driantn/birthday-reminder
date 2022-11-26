import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { VitePWA } from "vite-plugin-pwa";
import manifest from "./manifest.json";

export default defineConfig(({ mode }) => {
	return {
		plugins: [
			solidPlugin(),
			VitePWA({
				// registerType: "autoUpdate",
				strategies: "injectManifest",
				srcDir: "./",
				filename: "sw.ts",
				devOptions: {
					enabled: mode === "development",
				},
				manifest,
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
