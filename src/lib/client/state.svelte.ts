import { browser } from '$app/environment';
import type { CV, Settings } from '$lib/types/types';

function createState() {
	const initialState = loadData();
	let cv = $state<CV>(initialState.cv);
	const settings = $state<Settings>(initialState.settings);

	return {
		get cv() {
			return cv;
		},
		set cv(value: CV) {
			cv = value;
		},
		get settings() {
			return settings;
		}
	};
}

function loadData() {
	if (browser) {
		// check if local storage option is enabled
		const useLocalStorage = localStorage.getItem('useLocalStorage');
		if (useLocalStorage) {
			const cv = localStorage.getItem('cv');
			if (cv) {
				console.log('[STATE] Loading CV from local storage');
				return {
					cv: JSON.parse(cv) as CV,
					settings: { useLocalStorage: true }
				};
			}
		}
	}

	return {
		cv: defaultCv,
		settings: { useLocalStorage: false }
	};
}

const defaultCv: CV = {
	name: 'John Grammaticus',
	links: [],
	education: {
		heading: 'Education',
		schools: []
	},
	experience: {
		heading: 'Experience',
		jobs: []
	},
	skills: {
		heading: 'Skills',
		categories: []
	},
	other: {
		heading: 'Certifications',
		items: []
	}
};

export const appState = createState();
