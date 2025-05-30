import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite'

import react from '@astrojs/react';


import netlify from '@astrojs/netlify';


export default defineConfig({
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  integrations: [react()],
  adapter: netlify({
    edgeMiddleware: true
  }),
  output: 'server',
      session: {
      driver: "redis",
    },
    experimental: {
      session: true
    }
});