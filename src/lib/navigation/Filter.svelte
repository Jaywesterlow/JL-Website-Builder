<script>
  import { Select } from '$lib';

  let {
    options = [],
    selected = '',
    onChange = () => {},
    label = 'Filter'
  } =$props();
</script>

<Select
  {options}
  bind:selected
  placeholder="Alle types"
  label="{label}"
  on:change={(e) => onChange(e.detail)}
/>
