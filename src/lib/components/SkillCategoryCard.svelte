<script lang="ts">
	import type { CvSkillCategory } from '$lib/types/types';

	interface Props {
		category: CvSkillCategory;
		handleDelete: (id: string) => void;
	}

	let { category, handleDelete }: Props = $props();

	function openModal() {
		const modal = document.getElementById(`modal_${category.id}`) as HTMLDialogElement;
		modal.showModal();
	}

	function addSkill() {
		category.items.push('Skill');
	}

	function removeSkill(index: number) {
		category.items.splice(index, 1);
	}
</script>

<div class="join w-full">
	<input
		type="text"
		class="input input-sm join-item input-bordered input-primary grow"
		placeholder="Label"
		bind:value={category.label}
	/>
	<button class="btn btn-primary join-item btn-sm" onclick={openModal}>Edit details</button>
	<button
		class="btn btn-square join-item btn-active btn-sm"
		onclick={() => {
			handleDelete(category.id);
		}}>X</button
	>
</div>
<dialog id="modal_{category.id}" class="modal">
	<div class="modal-box border-2 border-solid border-primary">
		<div class="flex flex-col gap-2">
			<input
				type="text"
				class="input input-sm input-ghost w-full grow text-lg font-bold"
				placeholder="Label"
				bind:value={category.label}
			/>
			<div class="flex flex-row items-center gap-4 px-3">
				<p class="text-lg">Skills</p>
				<button class="btn btn-primary btn-sm" onclick={addSkill}>Add skill</button>
			</div>
			<div class="flex flex-col gap-2">
				{#if category.items.length === 0}
					<p class="px-3">Add skills with the button above!</p>
				{/if}
				{#each category.items as _, index}
					<div class="join w-full">
						<input
							type="text"
							class="input input-sm join-item input-bordered input-primary grow"
							placeholder="Skill"
							bind:value={category.items[index]}
						/>
						<button
							class="btn btn-square join-item btn-active btn-sm"
							onclick={() => {
								removeSkill(index);
							}}>X</button
						>
					</div>
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
