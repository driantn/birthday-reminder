import { defineConfig, loadEnv } from "vite";
import solidPlugin from "vite-plugin-solid";
import { VitePWA } from "vite-plugin-pwa";
import manifest from "./src/manifest";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");

	return {
		plugins: [
			solidPlugin(),
			VitePWA({
				registerType: "prompt",
				strategies: "injectManifest",
				injectRegister: "inline",
				srcDir: "./src",
				filename: "sw.ts",
				outDir: "./dist",
				devOptions: {
					enabled: mode === "development",
					type: "module",
				},
				manifest: manifest(env.VITE_BASE),
			}),
		],
		server: {
			port: 3000,
			host: "localhost",
		},
		base: env.VITE_BASE,
	};
});
