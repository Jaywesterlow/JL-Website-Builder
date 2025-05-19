<script>
  import { Select } from '$lib';
  export let options = [];
  export let selected = '';
  export let onChange = () => {};
</script>

<Select
  {options}
  bind:selected
  placeholder="Alle types"
  label="Filter"
  on:change={(e) => onChange(e.detail)}
/>
