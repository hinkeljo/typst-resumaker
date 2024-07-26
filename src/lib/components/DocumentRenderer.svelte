<script lang="ts">
	import { browser } from '$app/environment';
	import { PUBLIC_TYPST_TS_AIO_URL, PUBLIC_TYPST_TS_COMPILER_URL, PUBLIC_TYPST_TS_RENDERER_URL } from '$env/static/public';
	import { onMount } from 'svelte';

	let canvas: HTMLElement;

    const value = 'Hi mom!';

	onMount(() => {
        if(!browser) {
            return;
        }

        // append script element to load typst
        const script = document.createElement('script');
        script.src = PUBLIC_TYPST_TS_AIO_URL;
        script.type = 'module';
        script.id = 'typst';
        document.body.appendChild(script);

		script.addEventListener('load', function () {
            console.log('Typst script loaded!');
			globalThis.$typst.setCompilerInitOptions({
				getModule: () =>
					PUBLIC_TYPST_TS_COMPILER_URL
			});
			globalThis.$typst.setRendererInitOptions({
				getModule: () =>
					PUBLIC_TYPST_TS_RENDERER_URL
			});
			previewSvg(value);
		});
	});

	function previewSvg(mainContent: string) {
		globalThis.$typst.svg({ mainContent }).then((svg) => {
			console.log(`rendered! SvgElement { len: ${svg.length} }`);
			// append svg text
			canvas.innerHTML = svg;

			const svgElem = canvas.firstElementChild;
            if(!svgElem) {
                console.error('No SVG element was rendered!');
                return;
            }

            const w = svgElem.getAttribute('width');
            const h = svgElem.getAttribute('height');
            if (!w || !h) {
                console.error('No width or height attribute found!');
                return;
            }

			const width = Number.parseFloat(w);
			const height = Number.parseFloat(h);
			const cw = document.body.clientWidth - 40;
			svgElem.setAttribute('width', cw.toString());
			svgElem.setAttribute('height', ((height * cw) / width).toString());
		});
	}
</script>

<p>{value}</p>
<div bind:this={canvas}></div>
