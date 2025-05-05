<script>
  import { Svg } from "$lib";

  let {
    // button props
    text = "Button text",
    label = "Enter Aria-Label",
    color = "var(--blush-veil)",
    backgroundColor = "rgb(var(--blush-veil-rgb), 0.3)",
    padding = ".25rem .75rem",
    radius = "2rem",
    
    // icon props
    iconPosition = "",
    iconSize = "20px",
    iconRotation = iconPosition === "left" ? "180deg" : "0deg"
  } = $props();

</script>

<button
  aria-label={label}
  style="--color: {color}; --bg-color: {backgroundColor}; --padding: {padding}; --radius: {radius};"
>

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
    border-radius: var(--radius);
    transition: .2s all ease-in-out;
    white-space: nowrap;
  }

  a:hover {
    box-shadow: inset 0 0 0 1.2px var(--color);
    transition: .2s all ease-in-out;
  }
</style>