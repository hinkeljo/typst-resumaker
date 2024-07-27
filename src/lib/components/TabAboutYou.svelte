<script>
	import { appState } from '$lib/client/state.svelte';
	import LinksInput from './LinksInput.svelte';
</script>

<div class="flex flex-col gap-2">
	<h3 class="text-xl">Name</h3>
	<input
		type="text"
		class="input input-sm input-primary grow"
		placeholder=""
		bind:value={appState.cv.name}
	/>
	<LinksInput />
</div>
