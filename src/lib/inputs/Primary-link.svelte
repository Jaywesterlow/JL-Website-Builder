<script>
  import { Svg } from "$lib";

  let {
    // link props
    href = "#",
    text = "Link text",
    label = "Enter Aria-Label",
    color = "var(--warm-clay)",
    backgroundColor = "var(--pure-white)",
    padding = ".25rem .75rem",
    radius = "var(--radius-sm)",
  } = $props();

</script>

<a
  aria-label={label}
  href={href}
  style="
  --color: {color};
  --bg-color: {backgroundColor};
  --padding: {padding};
  --radius: {radius};"
>
{text}
</a>

<style>
  a {
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

  a:hover {
    color: var(--bg-color);
    background-color: var(--color);
    transition: .2s all ease-in-out;
    cursor: pointer;
  }
</style>