<script>
	import { appState } from '$lib/client/state.svelte';
	import ExperienceInput from './ExperienceInput.svelte';
</script>

<div class="flex flex-col gap-2">
	<h3 class="text-xl">Section label</h3>
	<input
		type="text"
		class="input input-sm input-primary grow"
		placeholder=""
		bind:value={appState.cv.experience.heading}
	/>
	<ExperienceInput />
</div>
