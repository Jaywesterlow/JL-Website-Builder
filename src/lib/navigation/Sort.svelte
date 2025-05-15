<script>
  import { createEventDispatcher } from 'svelte';
  export let options = [];
  export let selected = '';

  const dispatch = createEventDispatcher();

  function handleChange(event) {
    dispatch('change', event.target.value); // ✅ Dispatch event correctly
  }
</script>


<select bind:value={selected} on:change={handleChange} aria-label="Sorteren">
  {#each options as opt}
    <option value={opt.value}>{opt.label}</option>
  {/each}
</select>

<style>
  select {
    padding: 0.5rem;
    border: 1px solid var(--cloudy-sky);
    border-radius: var(--radius-sm);
  }
</style>
