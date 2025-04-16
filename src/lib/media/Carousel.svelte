<script>
  import { onMount } from 'svelte';

  let {
    caption = "Voeg hier jouw beschrijving toe",
    capColor = "white",
  } = $props();

  onMount(() => {
    const ul = document.querySelector('figure ul');
    const slidesLength = ul.querySelectorAll('li').length;
    ul.style.setProperty('--slides-length', slidesLength);
  });
</script>

<figure>
  <figcaption style="--caption-color: {capColor};">{caption}</figcaption>

  <ul>
    <li aria-label="1 of 3">
      <img src="/images/working-01.png" alt="Description" />
    </li>
    <li aria-label="2 of 3">
      <img src="/images/working-02.jpg" alt="Description" />
    </li>
    <li aria-label="3 of 3">
      <img src="/images/mockup-01.webp" alt="Description" />
    </li>
  </ul>
  
  <nav>
    <button 
      class="carousel-dot" 
      aria-label="Go to slide 1"
    ></button>
    <button 
      class="carousel-dot" 
      aria-label="Go to slide 2"
    ></button>
    <button 
      class="carousel-dot" 
      aria-label="Go to slide 3"
    ></button>
  </nav>
</figure>

<style>
  figure {
    position: relative;
    height: 100%;
    width: 100%;
  }

  figure figcaption {
    position: absolute;
    z-index: 2;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    color: var(--caption-color);
    text-align: center;
    min-width: 75%;
  }

  figure ul {
    position: relative;
    z-index: 1;
    display: flex;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;       
    -ms-overflow-style: none;
    margin: 0;
    padding: 0;
    list-style: none;
    height: 100%;
    border-radius: 8px;
  }

  figure ul::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(var(--black-rgb), 0.25);

    left: 0;
    right: 0;
    transform: scaleX(var(--slides-length));
    transform-origin: left;
  }

  figure ul li {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    scroll-snap-align: start;
  }

  figure ul li img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>