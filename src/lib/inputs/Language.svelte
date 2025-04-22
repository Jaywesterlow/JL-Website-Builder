<script>
  import { Svg } from '$lib';
  import { fade } from 'svelte/transition';
  import translations from '$lib/json/login.translations.json';
  import { currentLang } from '$lib/stores/language.js';

  let dropdownOpen = $state(false)

  function toggleDropdown() {
    dropdownOpen =! dropdownOpen
  }

  function changeLang(language) {
    $currentLang = language;
    dropdownOpen = false
  }

</script>

<div id="language-selector">
  <button 
  aria-expanded={dropdownOpen}
  onclick={toggleDropdown}
>
  {#if $currentLang === 'nl'}
    <Svg name="dutch-icon" size={"1.5rem"} />
    Nederlands
    <Svg name="chevron" color={"var(--deep-charcoal)"} size={"1.1rem"} rotation={"90deg"}/>
  {:else if $currentLang === 'en'}
    <Svg name="english-icon" size={"1.5rem"} />
    English
    <Svg name="chevron" color={"var(--deep-charcoal)"} size={"1.1rem"} rotation={"90deg"}/>
  {:else}
    <Svg name="german-icon" size={"1.5rem"} />
    Deutsch
    <Svg name="chevron" color={"var(--deep-charcoal)"} size={"1.1rem"} rotation={"90deg"}/>
  {/if}

  </button>

  {#if dropdownOpen}
    <ul transition:fade={{ duration: 175 }}>
      {#if $currentLang !== 'nl'}
        <li><button onclick={() => changeLang('nl')}><Svg name="dutch-icon" size={"1.5rem"}/>Nederlands</button></li>
      {/if}
      
      {#if $currentLang !== 'en'}
        <li><button onclick={() => changeLang('en')}><Svg name="english-icon" size={"1.5rem"}/>English</button></li>
      {/if}
      
      {#if $currentLang !== 'de'}
        <li><button onclick={() => changeLang('de')}><Svg name="german-icon" size={"1.5rem"}/>Deutsch</button></li>
      {/if}
    </ul>
  {/if}
</div>

<style>
  div {
    position: relative;
    display: inline-block;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: .4rem;
  }

  ul {
    z-index: 10;
    position: absolute;
    top: calc(100% + .5rem);
    left: 0;
    padding: 0;
    border-radius: .25rem;
    overflow: hidden;
    border: 1px solid var(--light-grey);
    background-color: var(--pure-white);
    box-shadow: 0 .25rem .5rem rgb(var(--black-rgb), 0.2);
    list-style: none;
  }

  ul li {
    padding: .65rem 1.3rem;
    cursor: pointer;

    &:hover {
      background-color: var(--blush-veil);
      transition: .2s all ease-in-out;
    }
  }
</style>
