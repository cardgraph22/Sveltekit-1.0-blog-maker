<script>
	import { Alert, Badge, Button } from 'flowbite-svelte';
</script>

<h1 class="text-center text-4xl mb-2.5">Welcome to <span class="text-4xl text-red-900">Blog-Maker</span></h1>

<p class="text-gray-700 text-center text-xl">This project is intended for Sveltekit 1.0 developers.
Its demonstrates recursive nested blog replies using the element:</p>
<p class='text-gray-600 text-center text-3xl mt-1.5 mb-1.5'>&lt;svelte:self&gt;</p>
<p class="text-gray-700 text-center text-xl">The documentation is in the README.MD file on github.</p>

<p class="text-gray-700 text-center text-xl">It uses MongoDB with Mongoose (if you're interested).</p>
<p class="text-gray-700 text-center text-xl">It also shows how to upload images (/userForm)</p>




<div class="text-center w-1/2 p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
  <span class="font-medium">Info alert! </span>Start with 'List Blogs' from the navbar
</div>
