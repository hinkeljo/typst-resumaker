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

	let canvas: HTMLElement;

	onMount(() => {
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
			previewSvg(content);
		});
	});

	function previewSvg(mainContent: string) {
		if (!globalThis.$typst || !globalThis.$typst.svg) {
			console.warn('[RENDERER] Typst not loaded or no svg function found!');
			return;
		}
		globalThis.$typst.svg({ mainContent }).then((svg) => {
			console.log(`[RENDERER] Rendered SvgElement { len: ${svg.length} }`);
			// append svg text
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
			const cw = document.body.clientWidth - 40;
			svgElem.setAttribute('width', cw.toString());
			svgElem.setAttribute('height', ((height * cw) / width).toString());
		});
	}

	$effect(() => {
		console.log(`[RENDERER] Content changed: ${content}! Rerendering...`);
		previewSvg(content);
	});
</script>

<p>{content}</p>
<div bind:this={canvas}></div>
