<script lang="ts">
	import { appState } from '$lib/client/state.svelte';
	import JobCard from './JobCard.svelte';

	const handleAdd = () => {
		const id = crypto.randomUUID();
		appState.cv.experience.jobs.push({
			id,
			company: 'Company',
			place: 'Place',
			positions: []
		});
	};

	const handleDelete = (id: string) => {
		appState.cv.experience.jobs = appState.cv.experience.jobs.filter((job) => job.id !== id);
	};
</script>

<div class="flex flex-row items-center gap-4">
	<h3 class="text-xl">Experience</h3>
	<button class="btn btn-primary btn-sm" onclick={handleAdd}>Add job</button>
</div>
{#if appState.cv.experience.jobs.length === 0}
	<p>Add jobs and positions with the button above!</p>
{:else}
	<div class="flex w-full flex-col gap-1">
		{#each appState.cv.experience.jobs as job}
			<JobCard {job} {handleDelete} />
		{/each}
	</div>
{/if}
