<script lang="ts">
	import type { CvJob } from '$lib/types/types';
	import PositionCard from './PositionCard.svelte';

	interface Props {
		job: CvJob;
		handleDelete: (id: string) => void;
	}

	let { job, handleDelete }: Props = $props();

	function openModal() {
		const modal = document.getElementById(`modal_${job.id}`) as HTMLDialogElement;
		modal.showModal();
	}

	function addPosition() {
		const id = crypto.randomUUID();
		job.positions.push({ id, title: 'Position', start: 'Start', end: 'End', bulletPoints: [] });
	}

	function deletePosition(id: string) {
		job.positions = job.positions.filter((position) => position.id !== id);
	}
</script>

<div class="join w-full">
	<input
		type="text"
		class="input input-sm join-item input-bordered input-primary grow"
		placeholder="Label"
		bind:value={job.company}
	/>
	<button class="btn btn-primary join-item btn-sm" onclick={openModal}>Edit details</button>
	<button
		class="btn btn-square btn-error join-item btn-sm"
		onclick={() => {
			handleDelete(job.id);
		}}>X</button
	>
</div>
<dialog id="modal_{job.id}" class="modal">
	<div class="modal-box border-2 border-solid border-primary">
		<div class="flex flex-col gap-2">
			<div class="flex w-full flex-row justify-between gap-4">
				<input
					type="text"
					class="input input-sm input-ghost grow text-lg font-bold"
					placeholder="Company"
					bind:value={job.company}
				/>
				<input
					type="text"
					class="input input-sm input-bordered input-primary"
					placeholder="Place"
					bind:value={job.place}
				/>
			</div>
			<div class="flex flex-row items-center gap-4 px-3">
				<p class="text-lg">Positions</p>
				<button class="btn btn-primary btn-sm" onclick={addPosition}>Add position</button>
			</div>
			<div class="flex flex-col gap-2">
				{#if job.positions.length === 0}
					<p class="px-3">Add positions with the button above!</p>
				{/if}
				{#each job.positions as position}
					<PositionCard {position} handleDelete={deletePosition} />
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
