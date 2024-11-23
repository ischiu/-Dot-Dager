// @ts-check
import { defineConfig,envField } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import svelte from '@astrojs/svelte';

import preact from '@astrojs/preact';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte(), preact()],
  output: 'server',
  adapter: netlify(),
  experimental: {
    env: {
      schema: {
        FROS_KEY: envField.string({
          context: 'client',
          access: 'public',
        }),
        MAID_KEY: envField.string({
          context: 'server',
          access: 'secret',
        }),
        SECRET_KEY: envField.string({
          context: 'server',
          access: 'secret',
        })
      }
    }
  }
});