<script>
  import { Button, Toolbar, Search, Filter, Sort, Pagination } from "$lib";
  import { onMount } from "svelte";

  const serverUrl = import.meta.env.VITE_SERVER_URL;

  let { data } = $props();


  // ─── State from data ───────────────────────────────────────
  let userId = $state(data.userId);
  let files = $state(data.files || []);
  let pagination = $state(
    data.pagination || {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      itemsPerPage: 4,
    }
  );
  let errorMessage = $state("");
  //   const serverUrl = process.env.REACT_APP_SERVER_URL;
  //   console.log(serverUrl);
  // ─── Toolbar State ─────────────────────────────────────────
  let sortOptions = $state([
    { value: "createdAt", label: "Datum" },
    { value: "fileName", label: "Naam" },
  ]);
  let selectedSort = $state("createdAt");
  let selectedSortOrder = $state("desc");
  let selectedFilter = $state("all");
  let search = $state("");
  // ─── File Upload State ─────────────────────────────────────
  let fileInput = $state(null);
  let selectedFiles = $state([]);
  let hasFiles = $derived(selectedFiles.length > 0);
  let dragActive = $state(false);

  // Ensure fileInput is set after mount

    let isUploading =  $state(false);


  onMount(() => {
    setTimeout(() => {
      if (!fileInput) {
        console.warn("fileInput not set after mount");
      } else {
        console.log("fileInput initialized successfully");
      }
    }, 0);
  });

  // ─── Filter Options ────────────────────────────────────────
  const filters = [
    { value: "all", label: "Alle Types" },
    { value: "image", label: "Afbeeldingen" },
    { value: "document", label: "Documenten" },
    { value: "video", label: "Video’s" },
  ];

  // ─── Utilities ─────────────────────────────────────────────
  function removeDupes(existing, incoming) {
    return incoming.filter(
      (file) =>
        !existing.some((f) => f.name === file.name && f.size === file.size)
    );
  }

  function fileUrl(file) {
    return URL.createObjectURL(file);
  }

  function removeFile(index) {
    selectedFiles = selectedFiles.filter(
      (_, arrayIndex) => arrayIndex !== index
    );
  }

  function formatBytes(bytes) {
    const sizes = ["B", "KB", "MB", "GB"];
    const calc = bytes ? Math.floor(Math.log2(bytes) / 10) : 0;
    return (bytes / 1024 ** calc).toFixed(1) + " " + sizes[calc];
  }

  // ─── Event Handlers ────────────────────────────────────────
  async function handleSearch(term) {
    search = term.detail.value;
    await fetchFiles();
  }

  function handleFilter(value) {
    selectedFilter = value.detail || value;
    fetchFiles();
  }

  function handleSort(value) {
    selectedSort = value.detail;
    selectedSortOrder = selectedSortOrder === "desc" ? "asc" : "desc";
    fetchFiles();
  }

  function handlePageChange(change) {
    pagination.currentPage = change.detail;
    fetchFiles();
  }

  function triggerFileDialog() {
    if (fileInput) {
      fileInput.click();
    } else {
      console.error("File input is not initialized");
      errorMessage = "File input not ready. Please try again.";
    }
  }

  function handleFileSelect(event) {
    const files = Array.from(event.target.files);
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

  async function handleUpload() {
    if (!hasFiles) return;

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("files", file));

    isUploading = true;

    try {
      console.log(
        "Uploading files:",
        $state
          .snapshot(selectedFiles)
          .map((f) => ({ name: f.name, size: f.size }))
      );
      const response = await fetch("/dashboard/media", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Upload successful:", result);
        files = [...result.files, ...files];
        selectedFiles = [];
        fetchFiles();
        errorMessage = "";
        isUploading = false;
      } else {
        const errorData = await response.json();
        console.error("Upload failed:", errorData);
        errorMessage = errorData.message || "Upload failed";
      }
    } catch (err) {
      console.error("Error uploading files:", err);
      errorMessage = "Server error during upload";
    } finally {
      isUploading = false; // 🔴 STOP LOADING
    }
  }

  async function fetchFiles() {
    const params = new URLSearchParams({
      page: pagination.currentPage.toString(),
      limit: pagination.itemsPerPage.toString(),
      search,
      filter: selectedFilter,
      sort: selectedSort,
      sortOrder: selectedSortOrder,
    });

    try {
      const response = await fetch(`/dashboard/media?${params}`);

      console.log(response);
      if (response.ok) {
        const result = await response.json();
        files = result.files;
        pagination = result.pagination;
        errorMessage = "";
      } else {
        const errorData = await response.json();
        errorMessage = errorData.message || "Failed to fetch files";
      }
    } catch (err) {
      console.error("Error fetching files:", err);
      errorMessage = "Server error while fetching files";
    }
  }

  // ─── Reactive Effects ──────────────────────────────────────
  $effect(() => {
    console.log("New selected files:", $state.snapshot(selectedFiles));
    //fetchFiles();
  });
</script>

<main>
  <article>
    <h1>Mediabibliotheek</h1>

    {#if errorMessage}
      <p class="error">{errorMessage}</p>
    {/if}

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
              <a href={fileUrl(file)} target="_blank" rel="noopener noreferrer">
                <span>{file.name}</span> — {formatBytes(file.size)}
              </a>
              <button
                type="button"
                onclick={() => removeFile(index)}
                aria-label="Remove {file.name}">✕</button
              >
            </li>
          {/each}
        </ul>
      {/if}

      <div role="group" aria-label="Upload buttons">
        <Button
          text="Kies uw bestanden"
          label="kies bestanden"
          color="var(--pure-white)"
          bgColor="var(--copper-blush)"
          padding=".25rem .75rem"
          on:click={triggerFileDialog}
        />

        {#if hasFiles}
          <Button
            text="Upload"
            label="upload geselecteerde bestanden"
            color="var(--warm-clay)"
            borderColor="var(--warm-clay)"
            padding=".25rem .75rem"
            on:click={handleUpload}
          />
        {/if}
      </div>

      <input
        type="file"
        multiple
        accept="image/*,video/*,application/pdf"
        bindElement={fileInput}
        onchange={handleFileSelect}
        style="display: none;"
      />
    </section>
  </article>

  <Toolbar>
    {#snippet childA()}
      <Search bindvalue={search} onsearch={(e) => handleSearch(e)} />
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
      <Sort
        options={sortOptions}
        bind:selected={selectedSort}
        onchange={handleSort}
      />
    {/snippet}
  </Toolbar>

  <ul class="file-grid">
    {#each files as file}
      <li>
        {#if file.fileType === "image"}
          <img
            src="{serverUrl}{file.filePath}"
            alt={file.fileName}
            style="max-width: 100%; height: auto;"
          />
        {:else if file.fileType === "video"}
          <video controls style="max-width: 100%; height: auto;">
            <source src="{serverUrl}{file.filePath}" type={file.mimeType} />
          </video>
        {:else}
          <a
            href="{serverUrl}{file.filePath}"
            target="_blank"
            rel="noopener noreferrer">{file.fileName}</a
          >
        {/if}
        <p>{file.fileName} — {formatBytes(file.fileSize)}</p>
      </li>
    {/each}
  </ul>

  <Pagination
    totalItems={pagination.totalItems}
    itemsPerPage={pagination.itemsPerPage}
    currentPage={pagination.currentPage}
    on:pageChange={handlePageChange}
  />

  {#if isUploading}
  <div class="upload-overlay">
    <div class="loader"></div>
    <p>Uploading files...</p>
  </div>
{/if}


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
      transition: 0.3s ease-in-out;
    }

    @media (min-width: 1024px) {
      padding: 2rem;
      width: 100%;
      align-items: center;
      justify-content: center;
      background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='15' ry='15' stroke='%23A2AAB1' stroke-width='4' stroke-dasharray='24, 24' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
      background-clip: padding-box;
      border-radius: var(--radius-lg);
      box-sizing: border-box;
      transform: translateZ(0);
      border: none;
      border-width: 0.9px;
      transition: 0.3s ease-in-out;
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
    padding: 0 0.5rem;
    cursor: pointer;
  }

  main article section ul li button:hover,
  main article section ul li button:focus {
    opacity: 0.5;
    border-radius: var(--radius-xs);
  }

  main article section div {
    display: flex;
    gap: 0.75rem;
  }

  main > ul.file-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 1rem;

    & li {
      border-radius: var(--radius-sm);
      background-color: var(--warm-clay);
      color: var(--pure-white);
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  }

  .error {
    color: red;
    font-weight: bold;
  }

   .upload-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.2rem;
  }

  .loader {
    width: 40px;
    height: 40px;
    border: 4px solid white;
    border-top: 4px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  
</style>
