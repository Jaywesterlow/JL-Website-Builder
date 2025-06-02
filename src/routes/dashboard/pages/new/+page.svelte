<script>
    import { PrimaryButton, Toolbar, Textfield, Sort, OptionSelect  } from "$lib";

    let sortOptions = $state(['Datum', 'Prioriteit', 'Meest gebruikt']);
    let selectedSort = $state('Datum');
</script>

<Toolbar>    
  {#snippet childA()}
  <Textfield
    placeholder="Naam invoeren..."
    on:submit={(e) => console.log("Ingevoerde waarde:", e.detail.value)}
  />
  {/snippet}
    
  {#snippet childB()}
  <Textfield
    placeholder="Naam invoeren..."
    on:submit={(e) => console.log("Ingevoerde waarde:", e.detail.value)}
  />
  {/snippet}
    
  {#snippet childC()}
    <Sort options={sortOptions} bind:selected={selectedSort}/>
  {/snippet}
</Toolbar>