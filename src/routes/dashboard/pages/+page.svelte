<script>
  import { PrimaryButton, Toolbar, Search, Filter, Sort, Pagination, Svg } from "$lib";

    let search = '';
    let selectedFilter = '';
    // let selectedSort = 'recent';

  const filters = [
    { value: 'images', label: 'Afbeeldingen' },
    { value: 'documents', label: 'Documenten' },
    { value: 'videos', label: 'Video’s' }
  ];

  // const sortOptions = [
  //   { value: 'recent', label: 'Recent' },
  //   { value: 'alphabetical', label: 'Alfabetisch' },
  //   { value: 'popular', label: 'Meest gebruikt' }
  // ];

  function handleSearch(term) {
    search = term;
  }

  function handleFilter(value) {
    selectedFilter = value;
  }

  // function handleSort(value) {
  //   selectedSort = value;
  // }

  let currentPage = 1;

  function handlePageChange(event) {
    currentPage = event.detail;
    // Fetch new data or update view accordingly
  }
</script>

<main>
  <section class="head">
    <h1>Pagina’s</h1>
    <PrimaryButton
      text = "Pagina toevoegen"
      label = "Pagina toevoegen"
      color = "var(--warm-clay)"
      padding = ".5rem .75rem"
    />
  </section>

  <Toolbar>
    <li slot="search">
      <Search bind:value={search} on:search={(e) => handleSearch(e.detail.value)} />
    </li>
  
    <li slot="filter">
      <Filter options={filters} selected={selectedFilter} onChange={handleFilter} />
    </li>
    
    <!-- <li slot="sort">
      <Sort options={sortOptions} selected={selectedSort} onChange={handleSort} />
    </li> -->
  </Toolbar>

  <p>Pagina weergeeft 10 van de 24</p>

  <section class="table">
    <ul>
        <li>Titel</li>
        <li>URL</li>
        <li>Status</li>
        <li>Laatst gewijzigd</li>
    </ul>

    <!-- {#each pages as page}
      <ul class="table-body">
        <li>{page.title}</li>
        <li>{page.url}</li>
        <li>{page.status}</li>
        <li>{page.lastModified}</li>   
      </ul>
      {/each} -->

      <article>
        <ul>
          <li class="title">Home</li>
          <li class="url">/</li>
          <li class="status">Gepubliceerd <Svg name="published" scale=".9"/></li>
          <li class="date">07-05-2025</li>   
        </ul>

        <ul class="actions">
          <li><a href="#">Bewerken</a></li>
          <li><a href="#">Bekijk</a></li>
          <li><a href="#">Dupliceren</a></li>
          <li><a href="#">Verwijderen</a></li>
        </ul>
      </article>
      <article>
        <ul>
          <li class="title">Contact</li>
          <li class="url">/contact</li>
          <li class="status">Gepubliceerd <Svg name="published" scale=".9"/></li>
          <li class="date">07-05-2025</li>   
        </ul>

        <ul class="actions">
          <li><a href="#">Bewerken</a></li>
          <li><a href="#">Bekijk</a></li>
          <li><a href="#">Dupliceren</a></li>
          <li><a href="#">Verwijderen</a></li>
        </ul>
      </article>
      <article>
        <ul>
          <li class="title">Over</li>
          <li class="url">/over</li>
          <li class="status">Concept <Svg name="draft" scale=".9"/></li>
          <li class="date">07-05-2025</li>   
        </ul>

        <ul class="actions">
          <li><a href="#">Bewerken</a></li>
          <li><a href="#">Bekijk</a></li>
          <li><a href="#">Dupliceren</a></li>
          <li><a href="#">Verwijderen</a></li>
        </ul>
      </article>
      <article>
        <ul>
          <li class="title">Trainingen</li>
          <li class="url">/trainingen</li>
          <li class="status">Concept <Svg name="draft" scale=".9"/></li>
          <li class="date">07-05-2025</li>   
        </ul>

        <ul class="actions">
          <li><a href="#">Bewerken</a></li>
          <li><a href="#">Bekijk</a></li>
          <li><a href="#">Dupliceren</a></li>
          <li><a href="#">Verwijderen</a></li>
        </ul>
      </article>
      <article>
        <ul>
          <li class="title">Trainingen</li>
          <li class="url">/trainingen</li>
          <li class="status">Concept <Svg name="draft" scale=".9"/></li>
          <li class="date">07-05-2025</li>   
        </ul>

        <ul class="actions">
          <li><a href="#">Bewerken</a></li>
          <li><a href="#">Bekijk</a></li>
          <li><a href="#">Dupliceren</a></li>
          <li><a href="#">Verwijderen</a></li>
        </ul>
      </article>
      <article>
        <ul>
          <li class="title">Trainingen</li>
          <li class="url">/trainingen</li>
          <li class="status">Concept <Svg name="draft" scale=".9"/></li>
          <li class="date">07-05-2025</li>   
        </ul>

        <ul class="actions">
          <li><a href="#">Bewerken</a></li>
          <li><a href="#">Bekijk</a></li>
          <li><a href="#">Dupliceren</a></li>
          <li><a href="#">Verwijderen</a></li>
        </ul>
      </article>
      <article>
        <ul>
          <li class="title">Trainingen</li>
          <li class="url">/trainingen</li>
          <li class="status">Concept <Svg name="draft" scale=".9"/></li>
          <li class="date">07-05-2025</li>   
        </ul>

        <ul class="actions">
          <li><a href="#">Bewerken</a></li>
          <li><a href="#">Bekijk</a></li>
          <li><a href="#">Dupliceren</a></li>
          <li><a href="#">Verwijderen</a></li>
        </ul>
      </article>
      <article>
        <ul>
          <li class="title">Trainingen</li>
          <li class="url">/trainingen</li>
          <li class="status">Concept <Svg name="draft" scale=".9"/></li>
          <li class="date">07-05-2025</li>   
        </ul>

        <ul class="actions">
          <li><a href="#">Bewerken</a></li>
          <li><a href="#">Bekijk</a></li>
          <li><a href="#">Dupliceren</a></li>
          <li><a href="#">Verwijderen</a></li>
        </ul>
      </article>
      <article>
        <ul>
          <li class="title">Trainingen</li>
          <li class="url">/trainingen</li>
          <li class="status">Concept <Svg name="draft" scale=".9"/></li>
          <li class="date">07-05-2025</li>   
        </ul>

        <ul class="actions">
          <li><a href="#">Bewerken</a></li>
          <li><a href="#">Bekijk</a></li>
          <li><a href="#">Dupliceren</a></li>
          <li><a href="#">Verwijderen</a></li>
        </ul>
      </article>
      <article>
        <ul>
          <li class="title">Trainingen</li>
          <li class="url">/trainingen</li>
          <li class="status">Concept <Svg name="draft" scale=".9"/></li>
          <li class="date">07-05-2025</li>   
        </ul>

        <ul class="actions">
          <li><a href="#">Bewerken</a></li>
          <li><a href="#">Bekijk</a></li>
          <li><a href="#">Dupliceren</a></li>
          <li><a href="#">Verwijderen</a></li>
        </ul>
      </article>
  </section>
  
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
    gap: 1.5rem;

    @media (min-width: 1024px) {
      gap: 3rem;
    }
  }

  main section.head {
    display: flex;
    align-items: center;
    justify-content: space-between;

    & h1 {
      font-size: 2rem; /* Added to reduce heading size */
    }

    @media (min-width: 1024px) {
      justify-content: flex-start;
      gap: 3rem;
    }
  }

  main > p {
    font-size: .7rem;
    font-weight: 300;
  }

  main section.table {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(42vw, 1fr));
    gap: 1.5rem;
    
    @media (min-width: 1024px) {
      display: block;
      box-shadow: var(--shadow-sm);
      border-radius: var(--radius-lg);
      border: 2px solid var(--blush-veil);
    }
  }
  
  main section.table ul {
    list-style-type: none;
  }

  main section.table > ul:first-child {
    display: none;

    @media (min-width: 1024px) {
      display: flex;
      padding: 1rem 0;
      font-weight: 500;
      font-size: .8rem;

      & li {
        flex: 1;
        padding-left: 2vw;
      }
    }
  }

  main section.table article {
    padding: 1rem;
    background: var(--soft-linen);
    border-radius: var(--radius-sm);
    border: 2px solid var(--terracotta);
    box-sizing: border-box;
    
    @media (min-width: 1024px) {
      display: flex;
      flex-direction: column;
      gap: .5rem;
      padding: .75rem .5rem;
      background: none;
      border-radius: 0;
      border: none;
      
      &:nth-child(even) {
        background-color: var(--soft-linen);
      }

      &:hover ul {
        transition: 0.2s all ease-in-out;
        transform: translate(0);
        
        &.actions {
          visibility: visible;
          opacity: 1;
          transition: 0.2s all ease-in-out;
        }
      }
    }
  }

  main section.table article ul {
    position: relative;
    display: flex;
    flex-direction: column;
    
    @media (min-width: 1024px) {
      flex-direction: row;
      transform: translateY(60%);
      transition: 0.2s all ease-in-out;
      
      & li {
        flex: 1;
        padding-left: 2vw;
      }
    }
  }
  
  main section.table article ul:first-child li {
    
    &.title {
      font-size: 1.25rem;

    }
    
    &.url {
      font-size:.875rem;
      
    }
    
    &.status {
      font-size:.875rem;
      position: absolute;
      display: flex;
      align-items: center;
      gap: .5rem;
      right: .25rem;
      top: .25rem;
    }
    
    &.date {
      font-size:1rem;

    }
    
    @media (min-width: 1024px) {
      &.title,
      &.url,
      &.status,
      &.date {
        position: static;
        font-size: clamp(0.5rem, 1vw + 0.4rem, .875rem);
      }
    }
  }

  main section.table article ul.actions {
    flex-direction: row;
    flex-wrap: wrap;
    gap: .25rem 1rem;
    visibility: visible;
    margin-top: 1rem;
    
    @media (min-width: 1024px) {
      margin-top: 0;
      visibility: hidden;
      opacity: 0;
    }
  }
  
  main section.table article ul.actions li {
    flex: 0 1;
    
    &:not(:first-child) {
      padding: 0;
    }
  }

  main section.table article ul.actions li a {
    font-size: clamp(0.75rem, 0.625rem + 0.625vw, 1rem);
    color: var(--dusty-rose);
    text-decoration: underline;
  }

  main footer {
    position: sticky;
    bottom: 0;
    width: 100%;
    z-index: 5;

    &::after {
        content: '';
        position: absolute;
        display: block;
        height: clamp(2rem, 6vw, 4.5rem);
        width: 100%;
        background: var(--pure-white);
    }
  }

</style>