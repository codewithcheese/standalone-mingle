<script>
    import Button from './Button.svelte'

    let { wire, data} = $props();

    const doubleCurrentCount = () => {
        wire.doubleIt()
    }

</script>

<div class="py-4">

    <div>
        Message: { data.message }
    </div>
    <div> Count: { data.count } </div>

    <div class="mt-2 flex gap-4 items-center">

        <Button onclick={() => {
         wire.$set('count', 1)
         wire.$set('message', 'Reset')
        }} label="Reset" />

        <div>
        <Button onclick={doubleCurrentCount} label="Double it" />
        </div>
    </div>

</div>

