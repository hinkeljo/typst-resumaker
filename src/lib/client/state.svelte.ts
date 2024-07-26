import type { CV } from '$lib/types/types';

function createState() {
	let cv = $state<CV>(loadCV());

	return {
		get cv() {
			return cv;
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
