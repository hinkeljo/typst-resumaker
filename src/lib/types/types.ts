export type CV = {
	name: string;
	links: CvLink[];
	education: {
		heading: string;
		schools: CvSchool[];
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

export type CvLink = {
	id: string;
	label: string;
	url: string;
};

export type CvSchool = {
	id: string;
	name: string;
	place: string;
	start: string;
	end: string;
	description: string;
};
