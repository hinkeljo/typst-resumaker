<script lang="ts">
	import { appState } from '$lib/client/state.svelte';
	import SkillCategoryCard from './SkillCategoryCard.svelte';

	const handleAdd = () => {
		const id = crypto.randomUUID();
		appState.cv.skills.categories.push({
			id,
			label: 'Category',
			items: []
		});
	};

	const handleDelete = (id: string) => {
		appState.cv.skills.categories = appState.cv.skills.categories.filter(
			(category) => category.id !== id
		);
	};
</script>

<div class="flex flex-row items-center gap-4">
	<h3 class="text-xl">Skills</h3>
	<button class="btn btn-primary btn-sm" onclick={handleAdd}>Add skills</button>
</div>
{#if appState.cv.skills.categories.length === 0}
	<p>Add skills grouped by categories with the button above!</p>
{:else}
	<div class="flex w-full flex-col gap-1">
		{#each appState.cv.skills.categories as category}
			<SkillCategoryCard {category} {handleDelete} />
		{/each}
	</div>
{/if}
