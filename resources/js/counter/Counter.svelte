<script>
    import Button from './Button.svelte'

    let props = $props();

    console.log('props', props)

    const doubleCurrentCount = () => {
        props.call('doubleIt')
    }

    // wire.on('doubleIt', (randomString) => {
    //     console.log('Double it! 😎', randomString)
    // })

    $inspect('props',props, props.data)

    function sayHello() {
        alert('Hello world!')
    }

</script>

<div class="m-10">

    <div class="text-lg">
        Counter component with Svelte
    </div>

    <div class="mt-8">
        Initial message: { props.data.message }
    </div>

    <div class="mt-8"></div>

    <div> Let's make the operation on the server, for demo purposes. </div>
    <div class="mt-2 flex gap-4 items-center">

        <Button onclick={sayHello}  label="Hello world!" />

        <Button onclick={() => props.set('count', 1)} label="Keep it (reset)" />
        <div> Current Count: { props.data.count } </div>
        <Button onclick={doubleCurrentCount} label="Double it - and give it to the next person" />
    </div>

</div>

