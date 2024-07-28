<script lang="ts">
	import { appState } from '$lib/client/state.svelte';
	import { parseTemplate } from '$lib/client/template';
	import DocumentRenderer from '$lib/components/DocumentRenderer.svelte';
	import TabAboutYou from '$lib/components/TabAboutYou.svelte';
	import TabEducation from '$lib/components/TabEducation.svelte';
	import TabExperience from '$lib/components/TabExperience.svelte';
	import TabOther from '$lib/components/TabOther.svelte';
	import TabSkills from '$lib/components/TabSkills.svelte';

	let activeTab = $state(0);
	const tabs = ['About you', 'Education', 'Experience', 'Skills', 'Other'];
</script>

<div class="flex flex-row gap-8">
	<div class="flex flex-1 flex-col gap-4">
		<div role="tablist" class="tabs-boxed tabs">
			{#each tabs as tab, index}
				<button
					class="tab"
					class:tab-active={index === activeTab}
					onclick={() => {
						activeTab = index;
					}}>{tab}</button
				>
			{/each}
		</div>
		{#if activeTab === 0}
			<TabAboutYou />
		{/if}
		{#if activeTab === 1}
			<TabEducation />
		{/if}
		{#if activeTab === 2}
			<TabExperience />
		{/if}
		{#if activeTab === 3}
			<TabSkills />
		{/if}
		{#if activeTab === 4}
			<TabOther />
		{/if}
	</div>
	<div>
		<DocumentRenderer content={parseTemplate(appState.cv)} />
	</div>
</div>
