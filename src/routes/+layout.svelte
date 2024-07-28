<script>
	import Settings from '$lib/components/Settings.svelte';
	import '../app.css';
</script>

<header
	class="sticky top-0 z-30 flex w-full flex-row items-center justify-between border-b-2 border-b-primary bg-base-100 bg-opacity-50 p-4 backdrop-blur-lg"
>
	<p class="text-xl md:text-4xl">Typst Resume Maker</p>
	<Settings />
</header>
<div class="flex h-full min-h-full flex-col items-center p-2 md:p-4">
	<main class="h-full w-full max-w-6xl">
		<slot></slot>
	</main>
</div>
