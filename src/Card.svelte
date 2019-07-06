<script>
  import { onMount } from 'svelte';

  export let elevation = 2;
  export let pressedElevation = elevation - 1;

  let cardElement;

  function setElevationOpacity(elevationLevel) {
    const elevationOpacity = [0, 0.05, 0.07, 0.08, 0.09, 0.11, 0.12, 0.14, 0.15, 0.16];
    cardElement.style.setProperty("--elevation-opacity", elevationOpacity[elevationLevel]);
  }

  onMount(() => {
    setElevationOpacity(elevation);
  })
</script>


<style>
  .card {
    padding: 16px;
    background-color: rgba(255, 255, 255, var(--elevation-opacity));
    transition: background-color 100ms ease-in-out;
    border-radius: 3px;
    margin: 8px;
  }
</style>

<div
  class="card"
  bind:this={cardElement}
  on:mousedown={setElevationOpacity.bind(null, pressedElevation)}
  on:mouseup={setElevationOpacity.bind(null, elevation)}
>
  <slot>
    <p>Provide the content of the card inside of the card element</p>
  </slot>
</div>
