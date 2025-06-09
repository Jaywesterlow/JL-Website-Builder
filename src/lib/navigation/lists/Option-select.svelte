
<script>
  import { Button } from "$lib";
  let {
    title = "Option select"
  } = $props()
</script>

<section>
  <h2>{title}</h2>

  <ul>
    <li>
      <p>Hero Sectie #1</p>
      <Button
        text = "Bekijk voorbeeld"
        label = "Bekijk voorbeeld"
        color = "var(--pure-white)"
        bgColor = "var(--copper-blush)"
        padding = ".25rem .5rem"
      />

    
      <Button
        text = "Activeren"
        label = "Activeren"
        color = "var(--warm-clay)"
        borderColor = "var(--warm-clay)"
        padding = ".25rem .5rem"
      />
    
    </li>
  </ul>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: var(--soft-linen);
    padding: 1.25rem 1.5rem;
    box-shadow: var(--shadow-lg);
    width: fit-content;
  }

  section h2 {
    font-weight: 300;
    font-size: clamp(0.75rem, 1vw + 0.5rem, 1rem);
  }

  section ul {
    list-style: none;
  }

  section ul li {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
</style>