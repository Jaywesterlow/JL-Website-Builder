<script>
    import { PrimaryLink, Toolbar, Textfield, Sort, OptionSelect  } from "$lib";

    let sortOptions = $state(['Datum', 'Prioriteit', 'Meest gebruikt']);
    let selectedSort = $state('Datum');
</script>

<main>
  <section class="head">
    <h1>Pagina toevoegen</h1>
    <PrimaryLink
      href="../pages"
      text = "Opslaan"
      label = "pagina opslaan"
      color = "var(--warm-clay)"
      padding = ".5rem .75rem"
    />
  </section>

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

  <OptionSelect
    title={"Actief!"}
  />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    @media (min-width: 1024px) {
      gap: 2rem;
    }
  }

  main section.head {
    display: flex;
    align-items: center;
    justify-content: space-between;

    & h1 {
      font-size: 2rem;
    }

    @media (min-width: 1024px) {
      justify-content: flex-start;
      gap: 1.5rem;
    }
  }
</style>
