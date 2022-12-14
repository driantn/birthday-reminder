const manifest = (base: string) => ({
	short_name: "Birthday reminder",
	name: "Birthday reminder",
	icons: [
		{
			src: "favicon.ico",
			sizes: "64x64 32x32 24x24 16x16",
			type: "image/x-icon",
		},
		{
			src: "logo32.png",
			type: "image/png",
			sizes: "32x32",
		},
		{
			src: "logo64.png",
			type: "image/png",
			sizes: "64x64",
		},
		{
			src: "logo128.png",
			type: "image/png",
			sizes: "128x128",
		},
		{
			src: "logo256.png",
			type: "image/png",
			sizes: "256x256",
		},
		{
			src: "logo512.png",
			type: "image/png",
			sizes: "512x512",
		},
	],
	// shortcuts: [
	// 	{
	// 		name: "Add new birthday",
	// 		short_name: "Add new birthday",
	// 		description: "Quick way to Add new birthday",
	// 		url: `${base}user`,
	// 		icons: [{ src: `${base}logo128.png`, sizes: "128x128" }],
	// 	},
	// ],
	start_url: `${base}`,
	display: "standalone",
	theme_color: "#2c3e50",
	background_color: "#2c3e50",
});

export default manifest;
