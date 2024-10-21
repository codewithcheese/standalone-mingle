<script>
    import { onMount } from "svelte";

    let { wire, data } = $props();

    let streamRef = null;
    let started = $state(false);
    let count = $state(null);
    let observer = null;

    function begin() {
        wire.begin();
    }

    $inspect("stream", data);

    onMount(async () => {
        // Create a mutation observer
        observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === "childList") {
                    // Update the count when content of #count changes
                    count = mutation.target.textContent.trim();
                }
            });
        });

        // Observe the #count element for changes in child nodes
        observer.observe(streamRef, {
            childList: true, // Observe direct children changes
            subtree: false, // Don't observe the subtree
        });

        // Cleanup observer when component is destroyed
        return () => {
            observer.disconnect();
        };
    });
</script>

<div class="py-4">
    <div>
        <button onclick={begin}>
            {#if started}Stop{:else}Start{/if}
        </button>
    </div>
    <div bind:this={streamRef} class="hidden" wire:stream="count">null</div>
    <div>Count: {count}</div>
</div>
