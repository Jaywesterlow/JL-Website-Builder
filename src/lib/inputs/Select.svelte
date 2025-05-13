<script>
  import { createEventDispatcher, onMount } from 'svelte';

  export let options = [];
  export let selected = '';
  export let placeholder = 'Kies een optie';
  export let label = 'Filter op bestandstype';

  const dispatch = createEventDispatcher();
  let isOpen = false;
  let highlightedIndex = -1;

  let dropdown; // reference to the DOM element

  function toggle() {
    isOpen = !isOpen;
  }

  function selectOption(option) {
    selected = option.value;
    isOpen = false;
    dispatch('change', selected);
  }

  function handleKeydown(e) {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      highlightedIndex = (highlightedIndex + 1) % options.length;
    } else if (e.key === 'ArrowUp') {
      highlightedIndex = (highlightedIndex - 1 + options.length) % options.length;
    } else if (e.key === 'Enter') {
      if (options[highlightedIndex]) {
        selectOption(options[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      isOpen = false;
    }
  }

  // ✅ Only runs in the browser
  onMount(() => {
    const handleClickOutside = (event) => {
      if (dropdown && !dropdown.contains(event.target)) {
        isOpen = false;
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<div class="select-wrapper">
  <label for="select-toggle">{label}</label>
  <div
    class="select-container"
    bind:this={dropdown}
    role="combobox"
    aria-expanded={isOpen}
    aria-haspopup="listbox"
    aria-controls="select-list"
  >
    <button
      id="select-toggle"
      class="select-toggle"
      type="button"
      on:click={toggle}
      on:keydown={handleKeydown}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
    >
      {#if selected}
        {options.find(opt => opt.value === selected)?.label}
      {:else}
        {placeholder}
      {/if}
    </button>

    {#if isOpen}
      <ul id="select-list" class="select-list" role="listbox">
        {#each options as opt, i}
          <li role="option" aria-selected={opt.value === selected}>
            <button
              type="button"
              class:selected={opt.value === selected}
              class:highlighted={i === highlightedIndex}
              on:click={() => selectOption(opt)}
              on:keydown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  selectOption(opt);
                }
              }}
            >
              {opt.label}
            </button>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>

<style>
  .select-wrapper {
    width: 100%;
  }

  label {
    display: block;
    font-weight: 300;
    font-size: 1.25rem;
  }

  button {
    font-weight: 300;
    border-radius: var(--radius-sm);
  }

  .select-container {
    position: relative;
    width: 100%;
  }

  .select-toggle {
    width: 100%;
    padding: 0.5rem;
    border: 2px solid var(--terracotta);
    border-radius: var(--radius-sm);
    background-color: var(--pure-white);
    text-align: left;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .select-toggle:focus {
    outline: none;
    border-color: var(--cocoa-brown);
    box-shadow: var(--shadow-lg);
  }

  .select-list {
    margin: 0;
    padding: 0;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    border: 2px solid var(--terracotta);
    border-radius: var(--radius-sm);
    background-color: var(--pure-white);
    z-index: 5;
    max-height: 200px;
    overflow-y: auto;
    box-shadow: var(--shadow-lg);
  }

  .select-list li {
    list-style: none;
  }

  .select-list button {
    width: 100%;
    text-align: left;
    padding: 0.5rem;
    border: none;
    background: transparent;
    cursor: pointer;
  }

  .select-list button:hover,
  .select-list button.highlighted {
    background-color: var(--cloudy-sky);
  }

  .select-list button.selected {
    background-color: var(--dusty-rose);
    font-weight: bold;
  }
</style>