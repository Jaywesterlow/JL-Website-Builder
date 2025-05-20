<script>
  let {
    totalItems = 0,
    itemsPerPage = 10,
    currentPage = 1
  } = $props();

  // Emit event when page changes
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let totalPages = $derived(Math.ceil(totalItems / itemsPerPage));

  function goToPage(page) {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      dispatch('pageChange', page);
    }
  }

  let pages = $derived(Array.from({ length: totalPages }, (_, page) => page + 1));
</script>

<footer>

  <nav>
    <ul>
      <li>
        <button onclick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>
      </li>
      
      {#each pages as page}
      <li>
        <button class:active={page === currentPage} onclick={() => goToPage(page)}>
          {page}
        </button>
      </li>
      {/each}
      
      <li>
        <button onclick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </li>
    </ul>
  </nav>
</footer>

<style>
  footer {
    position: sticky;
    bottom: -1.25rem;
    width: calc(100% + 2rem);
    margin-left: -1rem;
    z-index: 4;

    @media (min-width: 1024px) {
      bottom: -2.25rem;
    }

    &::after {
      content: '';
      border-radius: 0 0 1rem 1rem;
      position: absolute;
      display: block;
      height: calc(clamp(2rem, 6vw, 4.5rem) - 1.1rem);
      width: 100%;
      background: var(--pure-white);
      z-index: 4;
    }
  }
  
  nav {
    width: 100%;
    display: flex;
    justify-content: center;
    background: linear-gradient(to bottom, transparent, var(--pure-white));
  }
  
  nav ul {
    list-style: none;
    display: flex;
    align-items: center;
    gap: .5rem;
    padding: .75rem;
    background: var(--soft-linen);
    border-radius: var(--radius-lg);
    box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.18);
    z-index: 5;
  }
  
  nav ul li button {
    padding: .5rem .75rem;
    border: none;
    border-radius: var(--radius-sm);
    color: var(--copper-blush);
    background: none;
  }
  
  
  button.active {
    background: var(--warm-clay);
    color: var(--pure-white);
  }

  nav ul li:first-child button,
  nav ul li:last-child button {
    background: var(--soft-linen);
  }
</style>
