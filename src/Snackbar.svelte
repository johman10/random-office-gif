<script>
  import { fly } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';

  export let text = 'This is a snackbar message. Pass in a text prop to change this text.';
  export let shown = false;

  const dispatch = createEventDispatcher();

  function onTransitionEnd() {
    window.setTimeout(() => {
      shown = false
    }, 4000);
  }
</script>

<style>
  .snackbar {
    color: #000000de;
    font-family: 'Roboto';
    font-size: 14px;
    padding: 16px;
    width: 344px;
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #ffffff;
    border-radius: 3px;
  }
</style>

{#if shown}
  <div
    class="snackbar"
    transition:fly={{ y: 16, duration: 500 }}
    on:introend={onTransitionEnd}
    on:outroend={() => dispatch('done')}
  >
    {text}
  </div>
{/if}
