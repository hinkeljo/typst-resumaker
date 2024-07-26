// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	// eslint-disable-next-line no-var
	var $typst: {
		setCompilerInitOptions: (options: { getModule: () => string }) => void;
		setRendererInitOptions: (options: { getModule: () => string }) => void;
		svg?: (options: { mainContent: string }) => Promise<string>;
	};
}

export {};
