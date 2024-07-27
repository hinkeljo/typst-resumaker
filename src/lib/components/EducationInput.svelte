<script lang="ts">
	import { appState } from '$lib/client/state.svelte';
	import SchoolCard from './SchoolCard.svelte';

	const handleAdd = () => {
		const id = crypto.randomUUID();
		appState.cv.education.schools.push({
			id,
			name: 'School name',
			place: 'Place',
			start: 'Start date',
			end: 'End date',
			description: 'Description'
		});
	};

	const handleDelete = (id: string) => {
		appState.cv.education.schools = appState.cv.education.schools.filter(
			(school) => school.id !== id
		);
	};
</script>

<div class="flex flex-row items-center gap-4">
	<h3 class="text-xl">Schools</h3>
	<button class="btn btn-primary btn-sm" onclick={handleAdd}>Add school</button>
</div>
{#if appState.cv.education.schools.length === 0}
	<p>Add some schools and degrees with the button above!</p>
{:else}
	<div class="flex w-full flex-col gap-1">
		{#each appState.cv.education.schools as school}
			<SchoolCard {school} {handleDelete} />
		{/each}
	</div>
{/if}
