<ul>
  <slot name="search" />
  <slot name="filter" />
  <slot name="sort" />
</ul>

<style>
  ul {
    list-style-type: none;
    padding: 1.25rem 1.5rem;
    margin: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--soft-linen);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
  }

  ul :global(li) {
    padding: 0.5rem;
    flex: 1;
  }

  ul :global(li > *) {
    width: 100%;
  }
</style>