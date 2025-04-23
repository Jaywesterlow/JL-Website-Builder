<script>
  import { Svg } from '$lib';

	let { children } = $props();
</script>

<main>
  <nav>
    <a href="/"><img src="/images/Logo-lauralisa.nl-wit.png" alt="LAURALISA logo" /></a>
    <ul>
      <li><a href="/dashboard">
        
        <span class="icon">
          <Svg name="dashboard" size="18" color="currentColor"/>
        </span>
        Dashboard</a></li>
      <li><a href="/dashboard/pages">Paginas</a></li>
      <li><a href="/dashboard/menus">Menus</a></li>
      <li><a href="/dashboard/media">Media</a></li>
      <li><a href="/dashboard/settings">Instellingen</a></li>
    </ul>

  </nav>

  <section>
    {@render children()}
  </section>
</main>

<style>
  main {
    height: 100%;
    width: 100%;
    display: flex;
    gap: 1rem;
    padding: 1rem;
  }

  main nav {
    padding: .25rem 0 .25rem 1.25rem;
    display: flex;
    flex-direction: column;
    flex: 1 0 20%
  }

  main nav > a {
    width: 60%;

    img {
      width: 100%;
    }
  }

  main nav ul {
    list-style: none;
    padding: 0;
    margin: 1rem 0 0 0;
    display: grid;
    gap: 1rem;
    width: 100%;
    
    li a {
      font-size: 1.5rem;
      font-weight: 200;
      color: var(--pure-white);
      transition: all 0.3s ease-in-out;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      width: fit-content;

      span {
        color: var(--pure-white);
        transition: all 0.3s ease-in-out;
      }

      &:hover {
        color: var(--blush-veil);
        margin-left: .5rem;

        span {
          color: var(--blush-veil);
        }
      }
    }
  }

  main section {
    background-color: var(--pure-white);
    padding: 1.25rem;
    flex: 0 1 80%;
    border-radius: 1.25rem;
  }
</style>
