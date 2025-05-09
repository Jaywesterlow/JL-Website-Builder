<script>
  import { PrimaryButton } from "$lib";
</script>

<article>
  <h1>Mediabibliotheek</h1>
  
  <section>
    <p>Kies bestanden om te uploaden</p>
    <PrimaryButton
      text = "Kies uw bestanden"
      label = "kies bestanden"
      color = "var(--warm-clay)"
      padding = ".25rem .75rem"
    />
  </section>
  
</article>

<style>
  article {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media (min-width: 1024px) {
      gap: 2rem;
    }
  }

  article section {
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
</style>