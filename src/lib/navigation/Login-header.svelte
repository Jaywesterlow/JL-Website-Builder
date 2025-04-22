<script>
  import { Link01 } from "$lib";

  let {
    margin = "0",
    position = "static",
    index = "1",
    width = "100%",
    placement = null,
    text = ""
  } = $props();

  const derivedPosition = $derived(
    width !== "100%" && placement ? "absolute" : "static"
  );

  const placementStyles = $derived(
    (!placement || width === "100%") 
      ? "" 
      : placement === "left"
        ? "left: 1rem"
        : placement === "right"
          ? "right: 1rem"
          : placement === "center"
            ? "left: 50%; transform: translateX(-50%)"
            : ""
  );
</script>

<nav 
  style="
    --margin: {margin}; 
    --position: {derivedPosition}; 
    --index: {index}; 
    width: {width}; 
    {placementStyles}
  "
>
  <a href="/"><img src="/images/Logo-lauralisa.nl-wit.png" alt="LAURALISA logo" /></a>
  <Link01
    url={"/"}
    text={text}
    label={"Link terug naar hoofdsite"}
    color={"var(--blush-veil)"}
    backgroundColor={"rgb(var(--blush-veil-rgb), 0.3)"}
    iconPosition={"right"}
    iconSize={"15px"}
  />
</nav>

<style>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin: var(--margin);
    position: var(--position);
    z-index: var(--index);
  }

  nav a img {
    width: auto;
    height: clamp(2.75rem, 4vw, 4rem);
    object-fit: contain;
  }
</style>