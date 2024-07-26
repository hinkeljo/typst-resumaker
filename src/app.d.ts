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

	var $typst: {
		setCompilerInitOptions: (options: any) => void;
		setRendererInitOptions: (options: any) => void;
		svg: (options: any) => Promise<string>;
	}
}

export {};
