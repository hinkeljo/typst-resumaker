<script lang="ts">
	import LinkCard from './LinkCard.svelte';
	import { appState } from '$lib/client/state.svelte';

	const handleAdd = () => {
		const id = crypto.randomUUID();
		appState.cv.links.push({
			id,
			label: 'Label',
			url: 'Target'
		});
	};

	const handleDelete = (id: string) => {
		appState.cv.links = appState.cv.links.filter((link) => link.id !== id);
	};
</script>

<div class="flex flex-row items-center gap-4">
	<h3 class="text-xl">Links</h3>
	<button class="btn btn-primary btn-sm" onclick={handleAdd}>Add link</button>
</div>
{#if appState.cv.links.length === 0}
	<p>Add some links with the button above!</p>
{:else}
	<div class="flex w-full flex-col gap-1">
		{#each appState.cv.links as link}
			<LinkCard {link} {handleDelete} />
		{/each}
	</div>
{/if}
