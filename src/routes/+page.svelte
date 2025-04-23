<main>
  <h1>JL Website Builder</h1>
  <a href="/auth">klik hier om in te loggen</a>
</main>

<style>
  main {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    color: var(--deep-charcoal);
    padding: 5%;

    @media (min-width: 1440px) {
      padding: 0 15%;
    }

    a {
      text-decoration: underline;
      color: inherit;

      &:active {
        color: var(--blush-veil);
      }
    }
  }
</style>
