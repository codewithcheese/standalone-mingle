import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
    resolve: {
        alias: {
            "@mingle": "./resources/js/mingle",
        },
    },
    plugins: [
        laravel({
            input: [
                "resources/css/app.css",
                "resources/js/app.js",
                "resources/js/mingle.svelte.js",
            ],
            refresh: true,
        }),
        svelte(),
    ],
});
