<script lang="ts">
	import { appState } from '$lib/client/state.svelte';
	import DocumentRenderer from '$lib/components/DocumentRenderer.svelte';

	let content = $state('Hi mom!');
</script>

<div class="flex flex-row gap-8">
	<div class="flex-1">
		<input
			type="text"
			placeholder="Your name"
			class="input input-bordered w-full max-w-xs"
			bind:value={appState.cv.name}
		/>
		<pre>{JSON.stringify(appState.cv, null, 4)}</pre>
		<textarea bind:value={content} class="textarea textarea-bordered" placeholder="Bio"></textarea>
	</div>
	<div>
		<DocumentRenderer {content} />
	</div>
</div>
