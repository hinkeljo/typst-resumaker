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
			console.warn('[RENDERER] No svg function found!');
			return;
		}

		globalThis.$typst
			.svg({ mainContent })
			.then((svg) => {
				console.log(`[RENDERER] Rendered SvgElement { len: ${svg.length} }`);
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
		console.log(`[RENDERER] Content changed! Rerendering...`, content);
		render(content);
	});
</script>

<div
	bind:this={canvas}
	class="w-full max-w-xl rounded-box border-2 border-solid border-primary"
	class:bg-white={loaded}
	class:skeleton={!loaded}
></div>
