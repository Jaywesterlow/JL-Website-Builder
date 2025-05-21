<script>
    let { search, filter, sort } = $props();
</script>

<ul>
  {#if search}
    <li>{@render search()}</li>
  {/if}

  {#if filter}
    <li>{@render filter()}</li>
  {/if}

  {#if sort}
    <li>{@render sort()}</li>
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