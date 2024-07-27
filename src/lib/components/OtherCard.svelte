<script lang="ts">
	import type { CvOtherItem } from '$lib/types/types';

	interface Props {
		item: CvOtherItem;
		handleDelete: (id: string) => void;
	}

	let { item, handleDelete }: Props = $props();

	function openModal() {
		const modal = document.getElementById(`modal_${item.id}`) as HTMLDialogElement;
		modal.showModal();
	}
</script>

<div class="join w-full">
	<input
		type="text"
		class="input input-sm join-item input-bordered input-primary grow"
		placeholder="Label"
		bind:value={item.name}
	/>
	<button class="btn btn-primary join-item btn-sm" onclick={openModal}>Edit details</button>
	<button
		class="btn btn-square join-item btn-active btn-sm"
		onclick={() => {
			handleDelete(item.id);
		}}>X</button
	>
</div>
<dialog id="modal_{item.id}" class="modal">
	<div class="modal-box border-2 border-solid border-primary">
		<div class="flex flex-col gap-2">
			<input
				type="text"
				class="input input-sm input-ghost w-full grow text-lg font-bold"
				placeholder="Label"
				bind:value={item.name}
			/>
			<div class="join w-full">
				<input
					type="text"
					class="input input-sm join-item input-bordered input-primary grow"
					placeholder="Place"
					bind:value={item.place}
				/>
				<input
					type="text"
					class="input input-sm join-item input-bordered input-primary grow"
					placeholder="Date"
					bind:value={item.date}
				/>
			</div>
			<input
				type="text"
				class="input input-sm input-bordered input-primary w-full"
				placeholder="Description"
				bind:value={item.description}
			/>
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
