export type CV = {
	name: string;
	links: {
		label: string;
		url: string;
	}[];
	education: {
		heading: string;
		schools: {
			name: string;
			start: string;
			end: string;
			description: string;
		}[];
	};
	experience: {
		heading: string;
		jobs: {
			company: string;
			place: string;
			positions: {
				title: string;
				start: string;
				end: string;
				bulletPoints: string[];
			};
		}[];
	};
	skills: {
		heading: string;
		categories: {
			label: string;
			items: string[];
		}[];
	};
	other: {
		heading: string;
		items: {
			name: string;
			place: string;
			date: string;
			description: string;
		}[];
	};
};
