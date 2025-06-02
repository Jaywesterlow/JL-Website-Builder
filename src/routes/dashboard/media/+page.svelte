<script>
  import { PrimaryButton, Toolbar, Search, Filter, Sort, Pagination } from "$lib";

  // ─── Toolbar State ─────────────────────────────────────────
  let sortOptions = $state(["Datum", "Prioriteit", "Meest gebruikt"]);
  let selectedSort = $state("Datum");
  let selectedFilter = $state(null);
  let search = $state(null);

  // ─── Pagination State ──────────────────────────────────────
  let currentPage = $state(1);

  // ─── File Upload State ─────────────────────────────────────
  let fileInput = $state(null);
  let selectedFiles = $state([]);
  let hasFiles = $derived(() => selectedFiles.length > 0);
  let dragActive = $state(false);

  // ─── Filter Options ────────────────────────────────────────
  const filters = [
    { value: "all", label: "Alle Types" },
    { value: "images", label: "Afbeeldingen" },
    { value: "documents", label: "Documenten" },
    { value: "videos", label: "Video’s" },
  ];

  // ─── Utilities ─────────────────────────────────────────────
  function removeDupes(existing, incoming) {
    return incoming.filter(
      (file) =>
        !existing.some(
          (f) => f.name === file.name && f.size === file.size
        )
    );
  }

  function fileUrl(file) {
    return URL.createObjectURL(file);
  }

  function removeFile(index) {
    selectedFiles = selectedFiles.filter((_, arrayIndex) => arrayIndex !== index);
  }

  // ─── Event Handlers ────────────────────────────────────────

  function handleSearch(term) {
    search = term;
  }

  function handleFilter(value) {
    selectedFilter = value;
  }

  function handlePageChange(change) {
    currentPage = change.detail;
  }

  function triggerFileDialog() {
    fileInput.click();
  }

  function handleFileSelect(select) {
    const files = Array.from(select.target.files);
    const newFiles = removeDupes(selectedFiles, files);
    selectedFiles = [...selectedFiles, ...newFiles];
  }

  function handleDrop(event) {
    event.preventDefault();
    dragActive = false;

    const files = Array.from(event.dataTransfer.files);
    const newFiles = removeDupes(selectedFiles, files);
    selectedFiles = [...selectedFiles, ...newFiles];
  }

  function handleDragOver(event) {
    event.preventDefault();
    dragActive = true;
  }

  function handleDragLeave() {
    dragActive = false;
  }

  // ─── Reactive Effects ──────────────────────────────────────
  // Logs changes to selectedFiles for debugging or side effects
  $effect(() => {
    console.log("New selected files:", selectedFiles);
  });

  // ─── Calculation ───────────────────────────────────────────
  function formatBytes(bytes) {
    const sizes = ["B", "KB", "MB", "GB"];
    const calc = bytes ? Math.floor(Math.log2(bytes) / 10) : 0;
    return (bytes / 1024 ** calc).toFixed(1) + " " + sizes[calc];
  }

  // ─── Future Upload Function (commented out) ────────────────
  // function handleUpload() {
  //   console.log('Uploading:', selectedFiles);
  // } 
</script>

<main>
  <article>
    <h1>Mediabibliotheek</h1>

    <section
      role="region"
      aria-label="Drag & drop sectie"
      class:drag-active={dragActive}
      ondrop={handleDrop}
      ondragover={handleDragOver}
      ondragleave={handleDragLeave}
    >
      <h2 id="upload-heading" class="sr-only">Bestanden uploaden</h2>

      {#if selectedFiles.length === 0}
        <p>Kies bestanden om te uploaden</p>
      {:else}
        <ul>
          {#each selectedFiles as file, index}
            <li>
              <a href={fileUrl(file)} target="_blank" rel="noopener noreferrer"><span>{file.name}</span> — {formatBytes(file.size)}</a>
              <button type="button" onclick={() => removeFile(index)} aria-label="Remove {file.name}">✕</button>
            </li>
          {/each}
        </ul>
      {/if}

      <div role="group" aria-label="Upload buttons">
        <PrimaryButton
          text="Kies uw bestanden"
          label="kies bestanden"
          color="var(--warm-clay)"
          padding=".25rem .75rem"
          on:click={triggerFileDialog}
        />

        {#if hasFiles}
          <PrimaryButton
            text="Upload"
            label="upload geselecteerde bestanden"
            color="var(--warm-clay)"
            padding=".25rem .75rem"
            on:click={handleUpload}
          />
        {/if}
      </div>

      <input
        type="file"
        multiple
        accept="image/*,video/*,application/pdf"
        bind:this={fileInput}
        onchange={handleFileSelect}
        style="display: none;"
      />
    </section>
  </article>

  <Toolbar>
    {#snippet childA()}
      <Search
        bindvalue={search}
        onsearch={(search) => handleSearch(search.detail.value)}
      />
    {/snippet}

    {#snippet childB()}
      <Filter
        label="Type Bestand"
        options={filters}
        selected={selectedFilter}
        onchange={handleFilter}
      />
    {/snippet}

    {#snippet childC()}
      <Sort options={sortOptions} bind:selected={selectedSort} />
    {/snippet}
  </Toolbar>

  <ul>
    <li><h2>image</h2></li>
    <li><h2>image</h2></li>
    <li><h2>image</h2></li>
    <li><h2>image</h2></li>
    <li><h2>image</h2></li>
    <li><h2>image</h2></li>
    <li><h2>image</h2></li>
  </ul>

  <Pagination
    totalItems={50}
    itemsPerPage={10}
    {currentPage}
    on:pageChange={handlePageChange}
  />
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
    
    &.drag-active {
      background-color: var(--soft-linen);
      transition: .3s ease-in-out;
    }

    @media (min-width: 1024px) {
      padding: 2rem;
      width: 100%;
      align-items: center;
      justify-content: center;
      background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='15' ry='15' stroke='%23A2AAB1' stroke-width='4'  stroke-dasharray='24, 24' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
      background-clip: padding-box;
      border-radius: var(--radius-lg);
      box-sizing: border-box;
      transform: translateZ(0);
      border: none;
      border-width: 0.9px;
      transition: .3s ease-in-out;

    }
  }

  main article section h2.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
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

  main article section ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  main article section ul li a {
      color: var(--copper-blush);
      & span {
        font-weight: 600;
      }
    }

  main article section ul li a:hover,
  main article section ul li a:focus {
    text-decoration: underline;
    color: var(--copper-blush);
  }

  main article section ul li button {
    background: none;
    border: none;
    padding: 0 .5rem;
    cursor: pointer;
  }

  main article section ul li button:hover,
  main article section ul li button:focus {
    opacity: .5;
    border-radius: var(--radius-xs);
  }

  main article section div {
    display: flex;
    gap: 0.75rem;
  }

  /*<!--* File grid */
  main > ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 1rem;

    & li {
      height: 100px; /* ---------------------remove--------------------- */
      border-radius: var(--radius-sm);
      background-color: var(--warm-clay);
      color: var(--pure-white);
      padding: 1rem;
    }
  }
</style>
