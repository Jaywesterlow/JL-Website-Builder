<script>
  import { PrimaryButton, Toolbar, Textfield, Sort } from '$lib';

  let search = $state('');
  let selectedFilter = $state('');
  let sortOptions = $state(['Datum', 'Prioriteit', 'Meest gebruikt']);
  let selectedSort = $state('Datum');
  let currentPage = $state(1);

  // <!--* Toolbar filter options
  const filters = [
    { value: 'all', label: 'Alle Types' },
    { value: 'images', label: 'Afbeeldingen' },
    { value: 'documents', label: 'Documenten' },
    { value: 'videos', label: 'Video’s' },
  ];

  // <!--* Handlers
  function handleSearch(term) {
    search = term;
  }

  function handleFilter(value) {
    selectedFilter = value;
  }

  function handlePageChange(event) {
    currentPage = event.detail;
  }

</script>
<main>
  <article>
    <h1>Mediabibliotheek</h1>
    <section
      aria-label="Drag and drop area"
    >
      <p>Kies bestanden om te uploaden</p>
      <PrimaryButton
        text="Kies uw bestanden"
        label="kies bestanden"
        color="var(--warm-clay)"
        padding=".25rem .75rem"
      />
      <input
        type="file"
        accept="image/*,video/*,application/pdf"
        multiple
        bind:this={fileInput}
        onchange={handleFileSelect}
      />
    </section>
  </article>

  <Toolbar>    
    {#snippet childA()}
      <Search bindvalue={search} onsearch={(search) => handleSearch(search.detail.value)} />
    {/snippet}
      
    {#snippet childB()}
      <Filter label="Type Bestand" options={filters} selected={selectedFilter} onchange={handleFilter} />
    {/snippet}

    {#snippet childC()}
      <Sort options={sortOptions} bind:selected={selectedSort}/>
    {/snippet}
  </Toolbar>

    <ul>
      <li>
        <h2>jezus</h2>
      </li>      
    </ul>


  <Pagination
    totalItems={50}
    itemsPerPage={10}
    {currentPage}
  on:pageChange={handlePageChange} />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media (min-width: 1024px) {
      gap: 2rem;
    }
  }

  main article {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media (min-width: 1024px) {
      gap: 2rem;
    }
  }

  main article section {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media (min-width: 1024px) {
      padding: 2rem 0;
      align-items: center;
      justify-content: center;
      width: 100%;
      border: none;
      background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='15' ry='15' stroke='%23A2AAB1' stroke-width='4'  stroke-dasharray='24, 24' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
      border-radius: var(--radius-lg);
      box-sizing: border-box;
      background-clip: padding-box;
      transform: translateZ(0);
      border-width: 0.9px;
    }
  }

  main article section.drag-over {           /* ✅ Added */
    background-color: #eef6ff;
    border-color: #0077ff;
  }

  main article section ul {                  /* ✅ Added */
    list-style: none;
    margin-top: 1rem;
    padding: 0;
    font-size: 0.875rem;
    color: #333;
  }

  main article section ul li {               /* ✅ Added */
    background: #f0f0f0;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 6px;
  }

  main article section p {
    font-weight: 600;

    @media (min-width: 1024px) {
      &::after {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 0.75rem;
        content: "of";
        font-weight: 400;
      }
    }
  }

  main ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
  }

  main ul li {
    color: var(--pure-white);
    background-color: var(--warm-clay);
    height: 100px; /* ---------------------remove--------------------- */
    border-radius: var(--radius-lg);
    padding: 1rem;
  }
</style>