<script>
  import { Svg } from "$lib";
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();

  let {
    // button props
    text = "Button text",
    label = "Enter Aria-Label",
    color = "var(--warm-clay)",
    backgroundColor = "var(--pure-white)",
    padding = ".25rem .75rem",
    radius = "var(--radius-sm)",
    handleClick = (event) => {dispatch('click', event);}
  } = $props();
</script>

<button
  aria-label={label}
  style="
  --color: {color};
  --bg-color: {backgroundColor};
  --padding: {padding};
  --radius: {radius};"
    onclick={handleClick}
>
{text}
</button>

<style>
  button {
    font-size: clamp(0.5rem, calc(0.5rem + .5cqi), 1rem);
    position: relative;
    display: flex;
    align-items: center;
    max-width: fit-content;
    max-height: fit-content;
    padding: var(--padding);
    background-color: var(--bg-color);
    color: var(--color);
    border: .15rem solid var(--color);
    border-radius: var(--radius);
    transition: .2s all ease-in-out;
    white-space: nowrap;
  }

  button:hover {
    color: var(--bg-color);
    background-color: var(--color);
    transition: .2s all ease-in-out;
    cursor: pointer;
  }
</style>