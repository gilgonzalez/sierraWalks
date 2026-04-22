// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    site: 'https://sierrawalks.com',
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'es', 'de'],
        routing: {
            prefixDefaultLocale: false,
        },
    },
    integrations: [mdx(), sitemap(), react()],
    vite: {
        plugins: [tailwindcss()],
    },
    fonts: [
        {
            provider: fontProviders.google(),
            name: 'Fraunces',
            cssVariable: '--font-display',
            weights: [600, 700],
            styles: ['normal'],
            subsets: ['latin'],
            fallbacks: ['serif'],
        },
        {
            provider: fontProviders.google(),
            name: 'Manrope',
            cssVariable: '--font-ui',
            weights: [400, 500, 600, 700],
            styles: ['normal'],
            subsets: ['latin'],
            fallbacks: ['sans-serif'],
        },
    ],
});