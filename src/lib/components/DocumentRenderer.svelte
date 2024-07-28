<script lang="ts">
	import { browser } from '$app/environment';
	import {
		PUBLIC_TYPST_TS_AIO_URL,
		PUBLIC_TYPST_TS_COMPILER_URL,
		PUBLIC_TYPST_TS_RENDERER_URL
	} from '$env/static/public';
	import { onMount } from 'svelte';

	interface Props {
		content: string;
	}

	let { content }: Props = $props();

	let loaded = $state(false);
	let canvas = $state<HTMLElement | null>(null);

	onMount(async () => {
		if (!browser) {
			return;
		}

		// append script element to load typst
		const script = document.createElement('script');
		script.src = PUBLIC_TYPST_TS_AIO_URL;
		script.type = 'module';
		script.id = 'typst';
		document.body.appendChild(script);

		script.addEventListener('load', function () {
			console.log('[RENDERER] Typst script loaded!');
			globalThis.$typst.setCompilerInitOptions({
				getModule: () => PUBLIC_TYPST_TS_COMPILER_URL
			});
			globalThis.$typst.setRendererInitOptions({
				getModule: () => PUBLIC_TYPST_TS_RENDERER_URL
			});
			render(content);
		});

		loaded = true;
	});

	function render(mainContent: string) {
		if (!globalThis.$typst) {
			console.warn('[RENDERER] Typst not loaded!');
			return;
		}
		if (!globalThis.$typst.svg) {
			console.warn('[RENDERER] No render function found!');
			return;
		}

		globalThis.$typst
			.svg({ mainContent })
			.then((svg) => {
				console.log(`[RENDERER] Successfully rendered SVG!`);
				if (!canvas) {
					console.warn('[RENDERER] No canvas to render to!');
					return;
				}

				canvas.innerHTML = svg;

				const svgElem = canvas.firstElementChild;
				if (!svgElem) {
					console.error('[RENDERER] No SVG element was rendered!');
					return;
				}

				const w = svgElem.getAttribute('width');
				const h = svgElem.getAttribute('height');
				if (!w || !h) {
					console.error('[RENDERER] No width or height attribute found!');
					return;
				}

				const width = Number.parseFloat(w);
				const height = Number.parseFloat(h);
				const cw = canvas.clientWidth;
				svgElem.setAttribute('width', cw.toString());
				svgElem.setAttribute('height', ((height * cw) / width).toString());
			})
			.catch((err) => {
				console.error('[RENDERER] Error rendering SVG:', err);
			});
	}

	$effect(() => {
		console.log(`[RENDERER] Content changed! Rerendering...`);
		render(content);
	});

	function downloadPDF() {
		if (!globalThis.$typst) {
			console.warn('[RENDERER] Typst not loaded!');
			return;
		}
		if (!globalThis.$typst.pdf) {
			console.warn('[RENDERER] Typst not loaded!');
			return;
		}
		globalThis.$typst.pdf({ mainContent: content }).then((pdfData) => {
			const pdfFile = new Blob([pdfData], { type: 'application/pdf' });

			const link = document.createElement('a');
			link.href = URL.createObjectURL(pdfFile);
			link.target = '_blank';
			link.download = 'resume.pdf';
			link.click();
			URL.revokeObjectURL(link.href);
		});
	}

	function downloadTypst() {
		// create .typ file with content
		const typFile = new Blob([content], { type: 'text/plain' });

		const link = document.createElement('a');
		link.href = URL.createObjectURL(typFile);
		link.download = 'resume.typ';
		link.click();
		URL.revokeObjectURL(link.href);
	}
</script>

<div class="flex flex-col items-center gap-4">
	<div
		bind:this={canvas}
		class="w-full max-w-lg rounded-box border-2 border-solid border-primary"
		class:bg-white={loaded}
		class:skeleton={!loaded}
	></div>
	<div class="join">
		<button class="btn btn-primary join-item btn-sm" onclick={downloadPDF}>Download PDF</button>
		<button class="btn btn-outline btn-primary join-item btn-sm" onclick={downloadTypst}
			>Download Typst</button
		>
	</div>
</div>
