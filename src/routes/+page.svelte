<script>
  import { LoginHeader, Carousel, Language, Svg } from "$lib";
</script>

<main>
  <header>
    <LoginHeader margin={"2rem 0 0 0"}/>
  </header>
  <!-- <div style="width: 100%; display: flex; justify-content: center;"><Language /></div> -->
  <section>
    <article id="carousel-article">
      <LoginHeader width="95%" placement="center" index={"3"} />
      <Carousel />
    </article>
  
    <article id="login-article">
      <h1>JL CMS <span>Login</span></h1>
      <p>
        Log in om <span>toegang te krijgen tot de backend en</span> je website eenvoudig te
        beheren en bewerken.
      </p>
      <form action="/login" method="POST">
        <label class="email-label" for="email">
          <Svg
            name="account"
            margin="0 2px 0 0"
            color={"var(--charcoal)"}
            size={"1.3rem"}
          />Email
        </label>
        <input type="email" id="email" name="email" required />
  
        <label class="password-label" for="password">
          <Svg
            name="password"
            margin="0 2px 0 0"
            color={"var(--charcoal)"}
            size={"1.3rem"}
          />Wachtwoord
        </label>
        <input type="password" id="password" name="password" required />
  
        <label>
          <input type="checkbox" id="remember" name="remember" />
          <span></span>
          Remember me
        </label>
        <button type="submit">INLOGGEN</button>
      </form>
    </article>
  </section>
  
  
</main>

<style>
  main {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (min-width: 768px) {
      margin-top: 2rem;

      & header {
        display: none;
      }
    }
  } 

  main section {
    background-color: var(--light-beige);
    width: 100%;
    padding: .5rem;
    border-radius: 1rem;
    box-shadow: 0 10px 30px rgb(var(--black-rgb), 0.2);
    display: flex;
    gap: 2rem;
    
    @media (min-width: 768px) {
      min-height: clamp(500px, 60vh, 700px);
      max-width: clamp(700px, 90%, 1200px);
    }
  }

  section #carousel-article {
    display: none;

    @media (min-width: 768px){
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
    padding: .5rem;
    align-self: center;

    @media (min-width: 768px){
      flex: 0 1 50%;
    }
    
    @media (max-width: 768px){
      /* padding: 1rem 4rem; */
      padding: clamp(0.5rem, 2cqi, 1rem) clamp(0.5rem, 4cqi, 2rem);
    }
  }

  #login-article h1 {
    font-size: clamp(1.8rem, 12vw, 2.8rem);
    font-weight: 600;
    color: var(--charcoal);
    margin-bottom: 1rem;
    max-width: 100%;
    white-space: nowrap;

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

    & span {
      @media (min-width: 768px) and (max-width: 1024px) {
        display: none;
      }
    }
  }

  #login-article form {
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
    padding: 0 .75rem;
    width: 100%;
    height: 2rem;
    border-radius: 2rem;
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
    border-radius: 2rem;
    background: var(--slate-grey);
    color: var(--white);
    border: none;
  }
</style>
