<script>
  import Attribution from './Attribution';
  import Snackbar from './Snackbar';
  import Card from './Card';
  import copyToClipboard from './helpers/copyToClipboardHelper';
  import lazy from './actions/lazy';
  import { fade, crossfade } from 'svelte/transition';
  import randomOfficeGif from './helpers/giphy';

  let shown = false;
  const [send, receive] = crossfade({
		duration: d => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;
      const position = node.getBoundingClientRect();

			return {
				duration: 600,
				css: (t) => {
          return `
            position: absolute;
            top: ${position.top};
            left: ${position.left};
  					opacity: ${t};
            transform-origin: center
  				`
        }
			};
		}
	});

  function handleImageClick(output) {
    copyToClipboard(output.alt, output.src);
    shown = true;
  }

  const fetchPromise = randomOfficeGif();
</script>

<style>
  .app {
    height: 100%;
    width: 100%;
    flex: 1 1 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .app__image {
    display: block;
  }

  .app__instructions {
    color: #ffffff;
    margin: 0;
    text-align: center;
    font-family: 'Roboto';
    font-size: 14px;
    padding-top: 8px;
  }
</style>

<!-- in:receive={{key: 'app__instructions'}} out:send={{key: 'app__instructions'}}
in:receive={{key: 'app_image'}} out:send={{key: 'app_image'}} -->

<div class="app">
  <div class="app__content">
    {#await fetchPromise}
      <p class="app__instructions">Fetching the best one, just for you!</p>
    {:then output}
      <div>
        <Card>
          <img class="app__image" use:lazy={output.src} src={output.fallback} alt={output.alt} on:click={handleImageClick.bind(null, output)} />
          <p class="app__instructions" on:click={handleImageClick.bind(null, output)}>Click to copy markdown!</p>
        </Card>
      </div>
    {/await}
  </div>

  <Snackbar shown={shown} on:done={() => shown = false} text="Markdown was copied to your clipboard!" />
  <Attribution />
</div>
