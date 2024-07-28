<script lang="ts">
	import { appState } from '$lib/client/state.svelte';

	let upload: HTMLInputElement;

	function openModal() {
		const modal = document.getElementById('settings_modal') as HTMLDialogElement;
		modal.showModal();
	}

	function exportData() {
		const data = JSON.stringify(appState.cv);
		const blob = new Blob([data], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'resume-data.json';
		a.click();
		URL.revokeObjectURL(url);
		a.remove();
	}

	function importData() {
		console.log('[SETTINGS] Importing data');
		if (!upload.files) {
			console.error('[SETTINGS] No files found!');
			return;
		}
		// get file from input
		const file = upload.files[0];
		if (!file) {
			console.error('[SETTINGS] No file found!');
			return;
		}
		// read file
		const reader = new FileReader();
		reader.onload = (e) => {
			if (!e.target) {
				console.error('[SETTINGS] No target found!');
				return;
			}
			const data = e.target.result as string;
			try {
				const cv = JSON.parse(data);
				console.log('[SETTINGS] Imported data:', cv);
				appState.cv = cv;
			} catch (err) {
				console.error('[SETTINGS] Error parsing JSON:', err);
			}
		};
		reader.readAsText(file);
		// clear input
		upload.value = '';
	}

	$effect(() => {
		if (!appState.settings.useLocalStorage) {
			console.log('[SETTINGS] Clearing local storage!');
			localStorage.removeItem('cv');
			localStorage.removeItem('useLocalStorage');
		} else {
			console.log('[SETTINGS] Saving data to local storage!');
			localStorage.setItem('cv', JSON.stringify(appState.cv));
			localStorage.setItem('useLocalStorage', 'true');
		}
	});
</script>

<button class="btn btn-primary" onclick={openModal}>Settings</button>
<dialog id="settings_modal" class="modal">
	<div class="modal-box">
		<h3 class="text-lg font-bold">Settings</h3>
		<div class="form-control">
			<label class="label cursor-pointer">
				<span class="label-text">Save data in local storage</span>
				<input
					type="checkbox"
					class="toggle toggle-primary"
					bind:checked={appState.settings.useLocalStorage}
				/>
			</label>
		</div>
		<div class="flex w-full flex-row items-center gap-4 px-1 py-2">
			<span class="label-text">Import data</span>
			<input
				bind:this={upload}
				onchange={importData}
				type="file"
				class="file-input file-input-bordered file-input-primary file-input-sm"
			/>
		</div>
		<div class="flex w-full flex-row items-center gap-4 px-1 py-2">
			<span class="label-text">Export data</span>
			<button class="btn btn-primary btn-sm" onclick={exportData}>Export</button>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
