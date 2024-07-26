<script>
	import DocumentRenderer from '$lib/components/DocumentRenderer.svelte';

	let content = $state('Hi mom!');
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<input type="text" bind:value={content} />
<DocumentRenderer {content} />
