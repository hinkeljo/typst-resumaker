import type { CV, Settings } from '$lib/types/types';

function createState() {
	const cv = $state<CV>(loadCV());
	const settings = $state<Settings>({ useLocalStorage: false });

	return {
		get cv() {
			return cv;
		},
		get settings() {
			return settings;
		}
	};
}

function loadCV(): CV {
	return {
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
}

export const appState = createState();
