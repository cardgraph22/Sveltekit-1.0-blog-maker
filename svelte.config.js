import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$api: './src/api',
			$stores: './src/stores'
		}
	}
};

export default config;
