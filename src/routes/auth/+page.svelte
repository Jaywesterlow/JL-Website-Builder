<script>
  import { LoginHeader, Carousel, Language, Svg } from "$lib";
  import translations from "$lib/json/login.translations.json";
  import { currentLang } from "$lib/stores/language.js";
  import { goto } from '$app/navigation';


  
  //import { actions } from './+page.server.js';
  let email = "";
  let password = "";
  let remember = false;
  let errorMessage = "";

  // Form submission handler
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    const data = new FormData(event.target);

    try {
      // This should be the correct form submission to your server
      const response = await fetch("/auth", {
        method: "POST",
        body: new URLSearchParams(data),
      });

      const result = await response.json();

      console.log(result.status);

      if (result.status === 200) {
        // Handle successful login (e.g., redirect to dashboard)
        alert("Login successful!");
        // You can redirect to another page here
        goto('/dashboard');
      } else {
        // Handle error
        errorMessage = result.data || "An error occurred";
      }
    } catch (error) {
      // Handle unexpected errors
      errorMessage = "An unexpected error occurred. Please try again later.";
    }
  };
</script>

<main>
  <header>
    <LoginHeader
      text={translations["header-return"][$currentLang]}
      margin={"2rem 0 0 0"}
    />
  </header>

  <section>
    <article id="carousel-article">
      <LoginHeader
        text={translations["header-return"][$currentLang]}
        width="95%"
        placement="center"
        index={"3"}
      />
      <Carousel caption={translations["carousel-desc"][$currentLang]} />
    </article>

    <article id="login-article">
      <h1>JL CMS <span>{translations["form-title"][$currentLang]}</span></h1>
      <p>{translations["form-desc"][$currentLang]}</p>

      <!-- Login form -->
      <form on:submit={handleSubmit}>
        <label class="email-label" for="email">
          <Svg
            name="account"
            margin="0 2px 0 0"
            color={"var(--charcoal)"}
            size={"1.3rem"}
          />
          {translations["form-email"][$currentLang]}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          bind:value={email}
          required
        />

        <label class="password-label" for="password">
          <Svg
            name="password"
            margin="0 2px 0 0"
            color={"var(--charcoal)"}
            size={"1.3rem"}
          />
          {translations["form-password"][$currentLang]}
        </label>
        <input
          type="password"
          id="password"
          name="password"
          bind:value={password}
          required
        />

        <label>
          <input
            type="checkbox"
            id="remember"
            name="remember"
            bind:checked={remember}
          />
          <span></span>
          {translations["form-remember-me"][$currentLang]}
        </label>

        <button type="submit">
          {translations["form-button"][$currentLang]}
        </button>
      </form>

      <!-- Display error message if any -->
      {#if errorMessage}
        <div class="error-message">{errorMessage}</div>
      {/if}
    </article>
  </section>

  <aside><Language /></aside>
</main>
  
  <style>
    main {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      @media (min-width: 768px) {
        header {
          display: none;
        }
      }
    }

    main header {
      width: 100%;
    }

    main section {
      background-color: var(--light-beige);
      width: 100%;
      padding: 0.5rem;
      border-radius: 1rem;
      box-shadow: 0 10px 30px rgb(var(--black-rgb), 0.2);
      display: flex;
      gap: 1rem;

      @media (min-width: 768px) {
        min-height: clamp(500px, 60vh, 700px);
        max-width: clamp(700px, 90%, 1200px);
      }
    }

    main aside {
      display: flex;
      justify-content: end;
      margin-top: 0.5rem;
      width: 100%;

      @media (min-width: 768px) {
        max-width: clamp(700px, 90%, 1200px);
      }
    }

    section #carousel-article {
      display: none;

      @media (min-width: 768px) {
        display: block;
        position: relative;
        flex: 0 1 50%;

        min-height: 3.5rem;
        top: 0;
        left: 0;
        width: 100%;
      }
    }

    /* ----------------------------------- */

    section #login-article {
      padding: 0.5rem;
      align-self: center;
      max-width: 100%;

      @media (min-width: 768px) {
        flex: 0 1 50%;
      }

      @media (max-width: 768px) {
        padding: clamp(0.5rem, 2cqi, 1rem) clamp(0.5rem, 4cqi, 2rem);
      }
    }

    #login-article h1 {
      font-size: clamp(1rem, 8vw, 2rem);
      font-weight: 600;
      color: var(--charcoal);
      margin-bottom: 1rem;
      max-width: 100%;
      white-space: nowrap;

      @media (min-width: 768px) {
        font-size: clamp(1.2rem, 10vw, 2rem);
      }
    }

    #login-article h1 span {
      color: var(--terracotta);
      position: relative;
      margin-left: 0.5rem;

      &::before {
        content: "";
        position: absolute;
        left: -0.7rem;
        top: 10%;
        height: 80%;
        width: 0.2rem;
        border-radius: 1rem;
        background-color: var(--charcoal);
      }
    }

    #login-article p {
      font-weight: 600;
      margin-bottom: 2rem;
    }

    #login-article form label {
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }

    #login-article form input[type="email"],
    #login-article form input[type="password"] {
      display: block;
      margin-bottom: 2rem;
      padding: 0 0.75rem;
      width: 100%;
      height: 2rem;
      border-radius: 0.6rem;
      border: 2px solid var(--slate-grey);
      transition: border-color 0.2s ease;
    }

    #login-article form input[type="email"]:focus,
    #login-article form input[type="password"]:focus {
      border-color: var(--light-beige);
    }

    #login-article form label:has(input[type="checkbox"]) {
      display: flex;
      align-items: center;
      position: relative;
      padding-left: 24px;
      cursor: pointer;
      font-weight: 600;
    }

    #login-article form input[type="checkbox"] {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    #login-article form label:has(input[type="checkbox"]) span {
      position: absolute;
      left: 2px;
      height: 1.1rem;
      width: 1.1rem;
      border: 2px solid var(--charcoal);
      border-radius: 0.4rem;
      transition: all 0.2s ease-in-out;
    }

    #login-article form label:has(input[type="checkbox"]) span:hover {
      background-color: var(--charcoal);
    }

    #login-article form input[type="checkbox"]:checked + span {
      background-color: var(--charcoal);
    }

    #login-article form input[type="checkbox"]:checked + span:after {
      opacity: 1;
      transition: 0.15s ease-in-out;
    }

    #login-article form label:has(input[type="checkbox"]) span:after {
      content: "";
      position: absolute;
      opacity: 0;
      transition: 0.15s ease-in-out;
      left: 4px;
      top: 0px;
      width: 5px;
      height: 10px;
      border: solid var(--white);
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }

    #login-article form button {
      display: block;
      margin-bottom: 2rem;
      width: 100%;
      height: calc(2rem + 2px);
      border-radius: 0.6rem;
      background: var(--slate-grey);
      color: var(--white);
      border: none;
      cursor: pointer;
      transition: 0.2s all ease-in-out;

      &:hover {
        opacity: 0.9;
        transition: 0.2s all ease-in-out;
      }
    }
  </style>
