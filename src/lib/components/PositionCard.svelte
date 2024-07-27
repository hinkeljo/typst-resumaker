<script lang="ts">
	import type { CvJobPosition } from '$lib/types/types';

	interface Props {
		position: CvJobPosition;
		handleDelete: (id: string) => void;
	}

	let { position, handleDelete }: Props = $props();

	function openModal() {
		const modal = document.getElementById(`modal_${position.id}`) as HTMLDialogElement;
		modal.showModal();
	}

	function addBulletPoint() {
		position.bulletPoints.push('Description');
	}
</script>

<div class="join w-full">
	<input
		type="text"
		class="input input-sm join-item input-bordered input-primary grow"
		placeholder="Title"
		bind:value={position.title}
	/>
	<button class="btn btn-primary join-item btn-sm" onclick={openModal}>Edit details</button>
	<button
		class="btn btn-square btn-error join-item btn-sm"
		onclick={() => {
			handleDelete(position.id);
		}}>X</button
	>
</div>
<dialog id="modal_{position.id}" class="modal">
	<div class="modal-box max-w-md border-2 border-solid border-primary">
		<div class="flex flex-col gap-2">
			<input
				type="text"
				class="input input-sm input-ghost grow text-lg font-bold"
				placeholder="Title"
				bind:value={position.title}
			/>
			<div class="join">
				<input
					type="text"
					class="input input-sm join-item input-primary grow"
					placeholder="Start date"
					bind:value={position.start}
				/>
				<input
					type="text"
					class="input input-sm join-item input-primary grow"
					placeholder="End date"
					bind:value={position.end}
				/>
			</div>
			<div class="flex flex-row items-center gap-4 px-3">
				<p class="text-lg">Description</p>
				<button class="btn btn-primary btn-sm" onclick={addBulletPoint}>Add description</button>
			</div>
			<div class="flex flex-col gap-2">
				{#if position.bulletPoints.length === 0}
					<p class="px-3">Add bullet points with the button above!</p>
				{/if}
				{#each position.bulletPoints as _, index}
					<input
						type="text"
						class="input input-sm input-primary w-full"
						placeholder="Description"
						bind:value={position.bulletPoints[index]}
					/>
				{/each}
			</div>
		</div>
		<div class="modal-action">
			<form method="dialog">
				<!-- if there is a button in form, it will close the modal -->
				<button class="btn btn-primary btn-sm">Save</button>
			</form>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
