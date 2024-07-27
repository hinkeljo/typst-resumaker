<script lang="ts">
	import type { CvLink } from '$lib/types/types';

	interface Props {
		link: CvLink;
		handleDelete: (id: string) => void;
	}

	let { link, handleDelete }: Props = $props();
</script>

<div class="join w-full">
	<input
		type="text"
		class="input input-sm join-item input-bordered input-primary grow"
		placeholder="Label"
		bind:value={link.label}
	/>
	<input
		type="text"
		class="input input-sm join-item input-bordered input-primary grow"
		placeholder="Target"
		bind:value={link.url}
	/>
	<button
		class="btn btn-square join-item btn-active btn-sm"
		onclick={() => {
			handleDelete(link.id);
		}}>X</button
	>
</div>
