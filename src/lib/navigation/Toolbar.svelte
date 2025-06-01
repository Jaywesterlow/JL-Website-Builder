<script>
    let { childA, childB, childC } = $props();
</script>

<ul>
  {#if childA}
    <li>{@render childA()}</li>
  {/if}

  {#if childB}
    <li>{@render childB()}</li>
  {/if}

  {#if childC}
    <li>{@render childC()}</li>
  {/if}
</ul>

<style>
  ul {
    list-style-type: none;
    padding: 1.25rem 1.5rem;
    margin: 0;
    width: 100%;
    background-color: var(--soft-linen);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media (min-width: 1024px) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }

  ul :global(li) {
    flex: 1;
  }

  ul :global(li > *) {
    width: 100%;
  }
</style>