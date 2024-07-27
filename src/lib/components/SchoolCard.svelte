<script lang="ts">
	import type { CvSchool } from '$lib/types/types';

	interface Props {
		school: CvSchool;
		handleDelete: (id: string) => void;
	}

	let { school, handleDelete }: Props = $props();

	function openModal() {
		const modal = document.getElementById(`modal_${school.id}`) as HTMLDialogElement;
		modal.showModal();
	}
</script>

<div class="join w-full">
	<input
		type="text"
		class="input input-sm join-item input-bordered input-primary grow"
		placeholder="Label"
		bind:value={school.name}
	/>
	<button class="btn btn-primary join-item btn-sm" onclick={openModal}>Edit details</button>
	<button
		class="btn btn-square btn-error join-item btn-sm"
		onclick={() => {
			handleDelete(school.id);
		}}>X</button
	>
</div>
<dialog id="modal_{school.id}" class="modal">
	<div class="modal-box border-2 border-solid border-primary">
		<div class="flex flex-col gap-2">
			<div class="flex w-full flex-row justify-between gap-4">
				<input
					type="text"
					class="input input-sm input-ghost grow text-lg font-bold"
					placeholder="Name"
					bind:value={school.name}
				/>
				<input
					type="text"
					class="input input-sm input-bordered input-primary"
					placeholder="Place"
					bind:value={school.place}
				/>
			</div>
			<input
				type="text"
				class="input input-sm input-bordered input-primary w-full"
				placeholder="Description"
				bind:value={school.description}
			/>
			<div class="join w-full">
				<input
					type="text"
					class="input input-sm join-item input-bordered input-primary grow"
					placeholder="Start date"
					bind:value={school.start}
				/>
				<input
					type="text"
					class="input input-sm join-item input-bordered input-primary grow"
					placeholder="End date"
					bind:value={school.end}
				/>
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
