<script>
  import { Svg } from "$lib";

  let {
    // anchor props
    url = "#",
    text = "Button text",
    label = "Enter Aria-Label",
    color = "var(--light-beige)",
    backgroundColor = "rgb(var(--light-beige-rgb), 0.3)",
    padding = ".25rem .75rem",
    radius = "2rem",
    
    // icon props
    iconPosition = "",
    iconSize = "20px",
    iconRotation = iconPosition === "left" ? "180deg" : "0deg"
  } = $props();

</script>

<a
  href={url}
  aria-label={label}
  style="--color: {color}; --bg-color: {backgroundColor}; --padding: {padding}; --radius: {radius};"
>
  {#if (iconPosition === "left")}
    <Svg name="chevron" margin="0 5px 0 0" color={color} size={iconSize} rotation={iconRotation} />
  {/if}

  {text}

  {#if (iconPosition === "right")}
    <Svg name="chevron" margin="0 0 0 5px" color={color} size={iconSize} rotation={iconRotation} />
  {/if}
</a>

<style>
  a {
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
  }

  a:hover {
    /* outline: 2px solid var(--color);
    outline-offset: -2px; */
    box-shadow: inset 0 0 0 1.2px var(--color);
    transition: .2s all ease-in-out;
  }
</style>