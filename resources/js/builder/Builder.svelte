<script>
    import {isPreviewing, Content, fetchOneEntry} from "@builder.io/sdk-svelte";
    import {onMount} from "svelte";

    let {data, wire} = $props();

    let apiKey = data.apiKey
    let path = '/home'
    let model = 'page';

    let canShowContent = $state(isPreviewing())
    let content = $state(null)

    onMount(async () => {
        const {data} = await fetchOneEntry({
            apiKey, model, userAttributes: {
                urlPath: path,
            },
        });
        console.log('data', data)
        content = data;
        canShowContent = true;
    })
</script>

{#if canShowContent}
    <p>{content.title}</p>
    <Content
        model={model}
        content={content}
        apiKey={apiKey}
    />
{/if}
