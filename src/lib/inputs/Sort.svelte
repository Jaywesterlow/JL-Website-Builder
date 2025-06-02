<script>
  let {
    options = [],
    selected = $bindable()
  } = $props();

  function handleClick(option) {
    selected = option;
  }
</script>


<legend>Sorteer op</legend>
<ul>
  {#each options as option}
    <li>
      <button 
        class:selected={option === selected} onclick={() => handleClick(option)}>
        {option} 
      </button>
    </li>
  {/each}
</ul>

<style>
  legend {
    font-weight: 300;
  }

  ul {
    display: flex;
    justify-content: space-between;
    gap: .5rem;
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 100%;
    padding: .175rem;
    background: var(--pure-white);
    border: 2px solid var(--terracotta);
    border-radius: var(--radius-sm);
  }

  ul li {
    flex: 1;
    white-space: nowrap;
  }

  ul li button {
    cursor: pointer;
    width: 100%;
    padding: .175rem .5rem;
    border: none;
    transition: all .2s ease;
    background-color: var(--pure-white);
    border-radius: calc(var(--radius-sm) - .25rem);
    font-size: clamp(.75rem, 1vw + .5rem, 1rem);
    font-weight: 300;
    white-space: nowrap;
  }
  
  ul li button:hover {
    background: var(--soft-linen);
  }
  
  ul li button.selected {
    /* border: 2px solid var(--terracotta); */
    background: var(--blush-veil);
    color: var(--deep-charcoal);
  }
</style>

