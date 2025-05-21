<script>
  import {
    PrimaryButton,
    Toolbar,
    Search,
    Filter,
    Sort,
    Pagination,
  } from "$lib";

  // <!--* Toolbar variables
  let search = $state("");
  let selectedFilter = $state("");
  // let selectedSort = $state("recent");

  // <!--* Toolbar filter options
  const filters = [
    { value: "all", label: "Alle Types" },
    { value: "images", label: "Afbeeldingen" },
    { value: "documents", label: "Documenten" },
    { value: "videos", label: "Video’s" },
  ];

  // <!--* Toolbar sort options
  // const sortOptions = [
  //   { value: 'recent', label: 'Recent' },
  //   { value: 'alphabetical', label: 'Alfabetisch' },
  //   { value: 'popular', label: 'Meest gebruikt' }
  // ];

  // <!--* Toolbar search handler
  function handleSearch(term) {
    search = term;
  }

  // <!--* Toolbar filter handler
  function handleFilter(value) {
    selectedFilter = value;
  }
  
  // <!--* Toolbar sort handler
  // function handleSort(value) {
  //   selectedSort = value;
  // }


  // <!--* Pagination
  let currentPage = $state(1);

  function handlePageChange(event) {
    currentPage = event.detail;
  }
</script>
<main>
  <article>
    <h1>Mediabibliotheek</h1>
    <section>
      <p>Kies bestanden om te uploaden</p>
      <PrimaryButton
        text="Kies uw bestanden"
        label="kies bestanden"
        color="var(--warm-clay)"
        padding=".25rem .75rem"
      />
    </section>
  </article>

  <Toolbar>    
    {#snippet search()}
      <Search bindvalue={search} onsearch={(search) => handleSearch(search.detail.value)} />
    {/snippet}
      
    {#snippet filter()}
      <Filter options={filters} selected={selectedFilter} onChange={handleFilter} />
    {/snippet}

    <!-- {#snippet sort()}
    <Sort options={sortOptions} selected={selectedSort} onChange={handleSort} />
    {/snippet} -->
    
  </Toolbar>

  <ul>
    <li>card</li>
    <li>card</li>
    <li>card</li>
    <li>card</li>
    <li>card</li>
    <li>card</li>
    <li>card</li>
    <li>card</li>
    <li>card</li>
    <li>card</li>
    <li>card</li>
    <li>card</li>
    <li>card</li>
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
