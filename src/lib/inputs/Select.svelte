<script>
  import { createEventDispatcher, onMount } from 'svelte';

  let {
    options = [],
    selected = '',
    placeholder = 'Kies een optie',
    label = '',
  } = $props();

  // Define custom dropdown select component
  const dispatch = createEventDispatcher();
  let isOpen = $state(false);
  let highlightedIndex = $state(-1);
  let dropdown = $state();

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

  // Close dropdown when clicking outside
  onMount(() => {
    const handleClickOutside = (click) => {
      if (dropdown && !dropdown.contains(click.target)) {
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
      onclick={toggle}
      onkeydown={handleKeydown}
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
              onclick={() => selectOption(opt)}
              onkeydown={(e) => {
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
    font-size: clamp(0.75rem, 1vw + 0.5rem, 1rem);
  }

  button {
    font-weight: 300;
  }

  .select-container {
    position: relative;
    width: 100%;
  }

  .select-toggle {
    width: 100%;
    padding: .35rem;
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
    /* max-height: 200px; */
    overflow-y: auto;
    box-shadow: var(--shadow-lg);
  }

  .select-list li {
    list-style: none;
  }

  .select-list button {
    width: 100%;
    text-align: left;
    padding: 1rem;
    border: none;
    background: transparent;
    cursor: pointer;
  }

  .select-list button:hover,
  .select-list button.highlighted {
    background-color: var(--cloudy-sky);
  }

  .select-list button.selected {
    background-color: var(--soft-linen);
    font-weight: 500;
  }
</style>