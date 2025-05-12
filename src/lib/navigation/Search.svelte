<script>
  import { Svg } from '$lib';
  import { createEventDispatcher } from 'svelte';
  export let placeholder = "Zoeken...";
  export let value = "";
  export let live = false;
  const dispatch = createEventDispatcher();

  function handleSubmit(event) {
    event.preventDefault();
    dispatch('search', { value });
  }

  function handleInput(event) {
    value = event.target.value;
    if (live) {
      dispatch('search', { value });
    }
  }
</script>

<form on:submit={handleSubmit} role="search" aria-label="Zoekformulier">
  <label for="search-input">Zoeken</label>
  <input
    id="search-input"
    type="search"
    bind:value
    on:input={handleInput}
    {placeholder}
    aria-label="Zoek"
  />
  <button type="submit" aria-label="Zoek knop">
    <Svg name="search" rotation={'90deg'} scale={1.4} />
  </button>
</form>

<style>
  form {
    position: relative;
    width: 100%;
  }

  form label {
    margin-bottom: 0.5rem;
    font-weight: 300;
    font-size: 1.25rem;
  }

  input {
    width: 100%;
    padding: .5rem;
    border: 2px solid var(--terracotta);
    border-radius: var(--radius-sm);
    background-color: var(--pure-white);
    transition: all 0.2s ease;
  }

  input:focus {
    outline: none;
    border-color: var(--cocoa-brown);
    box-shadow: var(--shadow-lg);
  }

  button {
    position: absolute;
    width: fit-content !important;
    height: fit-content;
    background-color: var(--pure-white);
    right: .65rem;
    bottom: .45rem;
    border: none;
    cursor: pointer;
  }

</style>
