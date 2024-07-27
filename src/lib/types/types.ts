export type Settings = {
	useLocalStorage: boolean;
};

export type CV = {
	name: string;
	links: CvLink[];
	education: {
		heading: string;
		schools: CvSchool[];
	};
	experience: {
		heading: string;
		jobs: CvJob[];
	};
	skills: {
		heading: string;
		categories: CvSkillCategory[];
	};
	other: {
		heading: string;
		items: CvOtherItem[];
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

export type CvJob = {
	id: string;
	company: string;
	place: string;
	positions: CvJobPosition[];
};

export type CvJobPosition = {
	id: string;
	title: string;
	start: string;
	end: string;
	bulletPoints: string[];
};

export type CvSkillCategory = {
	id: string;
	label: string;
	items: string[];
};

export type CvOtherItem = {
	id: string;
	name: string;
	place: string;
	date: string;
	description: string;
};
