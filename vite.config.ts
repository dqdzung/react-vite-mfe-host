import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, "./src/environments");
	return {
		plugins: [
			react(),
			tailwindcss(),
			federation({
				name: "host",
				remotes: {
					mfe1:
						env.VITE_MFE1_URL || "http://localhost:3001/assets/remoteEntry.js",
					mfe2:
						env.VITE_MFE2_URL || "http://localhost:3002/assets/remoteEntry.js",
				},
				shared: ["react", "react-dom", "zustand", "tailwindcss"],
				exposes: {
					"./store": "./src/store",
				},
			}),
		],
		build: {
			target: "esnext",
			minify: true,
			cssCodeSplit: false,
		},
		server: {
			port: Number(env.VITE_APP_PORT) || 3000,
			strictPort: true,
			cors: true,
		},
		preview: {
			port: Number(env.VITE_APP_PORT) || 3000,
			strictPort: true,
			cors: true,
		},
		envDir: "./src/environments",
	};
});

