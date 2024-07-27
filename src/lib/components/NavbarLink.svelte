<script lang="ts">
	import { page } from '$app/stores';

	interface Props {
		label: string;
		href: string;
	}

	let { label, href }: Props = $props();
	const active = $derived($page.url.pathname === href);
</script>

<a {href} class="btn btn-primary join-item" class:btn-outline={!active}>{label}</a>
