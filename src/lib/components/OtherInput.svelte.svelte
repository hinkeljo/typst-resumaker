<script lang="ts">
	import { appState } from '$lib/client/state.svelte';
	import OtherCard from './OtherCard.svelte';

	const handleAdd = () => {
		const id = crypto.randomUUID();
		appState.cv.other.items.push({
			id,
			name: 'Label',
			place: 'Place',
			date: 'Date',
			description: 'Description'
		});
	};

	const handleDelete = (id: string) => {
		appState.cv.other.items = appState.cv.other.items.filter((item) => item.id !== id);
	};
</script>

<div class="flex flex-row items-center gap-4">
	<h3 class="text-xl">Other</h3>
	<button class="btn btn-primary btn-sm" onclick={handleAdd}>Add item</button>
</div>
{#if appState.cv.other.items.length === 0}
	<p>Add some other items with the button above!</p>
{:else}
	<div class="flex w-full flex-col gap-1">
		{#each appState.cv.other.items as item}
			<OtherCard {item} {handleDelete} />
		{/each}
	</div>
{/if}
