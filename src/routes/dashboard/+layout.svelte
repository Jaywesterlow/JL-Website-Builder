<script>
  import { Svg } from '$lib';
  import { fade, fly } from 'svelte/transition';
  import { page } from '$app/stores';
  import { navigating } from '$app/stores';

  let isNavOpen = $state(false);
  let transitioning = $state(false);
  let { data, children } = $props();

  const toggleNav = (e) => {
    if (window.innerWidth < 1024) {
      isNavOpen = !isNavOpen;
    }
  }

  const active = (path) => {
    return $page.url.pathname === path;
  }
</script>

<main class:open={isNavOpen}>
  <nav>
    <button onclick={toggleNav} aria-label="Toggle Navigation">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <a href="/"><img src="/images/Logo-lauralisa.nl-wit.png" alt="LAURALISA logo" /></a>

    <ul>
      <li><a href="/dashboard" onclick={toggleNav} class:active={active('/dashboard')}>
        <span class="icon"><Svg name="dashboard" size="18" color="currentColor"/></span>
        Dashboard
      </a></li>

      <li><a href="/dashboard/pages" onclick={toggleNav} class:active={active('/dashboard/pages')}>
        <span class="icon"><Svg name="pages" scale=".9" color="currentColor"/></span>
        Paginas
      </a></li>

      <li><a href="/dashboard/menus" onclick={toggleNav} class:active={active('/dashboard/menus')}>
        <span class="icon"><Svg name="menus" size="18" color="currentColor"/></span>
        Menus
      </a></li>

      <li><a href="/dashboard/media" onclick={toggleNav} class:active={active('/dashboard/media')}>
        <span class="icon"><Svg name="media" size="18" color="currentColor"/></span>
        Media
      </a></li>

      <li><a href="/dashboard/settings" onclick={toggleNav} class:active={active('/dashboard/settings')}>
        <span class="icon"><Svg name="settings" scale=".8" color="currentColor"/></span>
        Instellingen
      </a></li>
    </ul>
  </nav>

  <article>
    {#key data.url}
      <section
        class:transitioning={transitioning}
        in:fade={{ duration: 300, delay: 400 }}
        out:fade={{ duration: 400 }}
        onintrostart={() => transitioning = true}
        onoutroend={() => transitioning = false}
      >
        {@render children()}
      </section>
    {/key}
  </article>
</main>

<style>

  main {
    --nav-width: clamp(280px, 30vw + 5rem, 400px);
    height: 100%;
    width: 100%;
    display: flex;
    gap: 1rem;
    padding: 1rem;
    transition: transform .5s ease-in-out;
    &.open {
      transform: translateX(var(--nav-width));
    }
  }

  main nav {
    position: absolute;
    background-color: var(--dusty-rose);
    transform: translateX(-100%);
    width: var(--nav-width);
    z-index: 1;

    @media (min-width: 1024px) {
      background-color: transparent;
      position: relative;
      transform: none;
      padding: .25rem 0 .25rem 1.25rem;
      display: flex;
      flex-direction: column;
      flex: 1 0 20%;
    }
  }

  main nav > button {
    --radius: 1rem;
    position: absolute;
    top: -1px;
    right: 1px;
    transform: translateX(100%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: var(--dusty-rose);
    border: none;
    border-radius: 0 0 var(--radius) 0;
    cursor: pointer;
    height: 3rem;
    width: 3.5rem;
    padding: .9rem;
    z-index: 2;

    span {
      width: 100%;
      height: 3px;
      background: var(--pure-white);
      border-radius: 1rem;
    }

    &::before,
    &::after {
      content: '';
      position: absolute;
      width: var(--radius);
      aspect-ratio: 1;
      background-image: 
        radial-gradient(
          circle at 100% 100%,
          transparent var(--radius), 
          var(--dusty-rose, white)
          var(--radius));
    }

    &::before {
      top: 0;
      right: 0;
      transform: translateX(100%);
    }

    &::after {
      bottom: -1rem;
      left: -1rem;
      transform: translateX(100%);
    }

    @media (min-width: 1024px) {
      display: none;
    }
  }

  main nav > a {
    width: 100%;
    display: block;

    img {
      width: 80%;
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
      color: var(--blush-veil);
      transition: all 0.3s ease-in-out;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      width: fit-content;

      span {
        color: var(--blush-veil);
        transition: all 0.3s ease-in-out;
      }

      &:hover,
      &.active {
        color: var(--pure-white);
        margin-left: 1rem;

        span {
          color: var(--pure-white);
        }
      }
    }
  }

  main article {
    position: relative;
    background-color: var(--pure-white);
    border-radius: 1.25rem;
    flex: 0 1 100%;

    @media (min-width: 1024px) {
      flex: 0 1 80%;
    }
  }

  main article section {
    position: absolute;
    inset: 0;
    padding: clamp(3.25rem, 10vw, 6rem) clamp(1.625rem, 5vw, 3.25rem) clamp(2rem, 6vw, 4.5rem);
    width: 100%;
    height: 100%;
    overflow: auto;

    @media (min-width: 1024px) {
      padding: clamp(2.625rem, 8vw, 4.5rem) clamp(2rem, 6vw, 4rem) clamp(2rem, 5vw, 3.25rem);
    }
  }

  main section.transitioning {
    overflow: hidden;
  }
</style>
