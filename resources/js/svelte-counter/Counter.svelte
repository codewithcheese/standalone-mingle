<script>
    import Button from './Button.svelte'

    let { wire, mingleData } = $props();

    let count = $state(1)

    const doubleCurrentCount = () => {
        wire.doubleIt(count).then((data) => {
            count = data
        })
    }

    let message = $state(mingleData.message)

    wire.on('doubleIt', (randomString) => {
        console.log('Double it! 😎', randomString)
    })

    $inspect(count, message)

    function sayHello() {
        alert('Hello world!')
    }

</script>

<div class="m-10">

    <div class="text-lg">
        Counter component with Svelte
    </div>

    <div class="mt-8">
        Initial message: { message }
    </div>

    <div class="mt-8"></div>

    <div> Let's make the operation on the server, for demo purposes. </div>
    <div class="mt-2 flex gap-4 items-center">

        <Button onclick={sayHello}  label="Hello world!" />

        <Button onclick={() => count = 1} label="Keep it (reset)" />
        <div> Current Count: { count } </div>
        <Button onclick={doubleCurrentCount} label="Double it - and give it to the next person" />
    </div>

</div>

