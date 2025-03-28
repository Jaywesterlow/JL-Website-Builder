<script>
  import { LoginHeader, Svg } from "$lib";
  let currentSlide = 0;
  
  const handleSlideChange = (index) => {
    currentSlide = index;
  };
</script>

<LoginHeader />

<main>

  <article id="carousel-article">
    <LoginHeader />
    
    
    <figure>
      <figcaption>Your carousel description here</figcaption>

      <ul style="transform: translateX(-${currentSlide * 100}%)">
        <li aria-label="1 of 3">
          <img src="/path-to-image1.jpg" alt="Description 1" />
        </li>
        <li aria-label="2 of 3">
          <img src="/path-to-image2.jpg" alt="Description 2" />
        </li>
        <li aria-label="3 of 3">
          <img src="/path-to-image3.jpg" alt="Description 3" />
        </li>
      </ul>
      
      <nav>
        <button 
          class="carousel-dot" 
          class:active={currentSlide === 0}
          aria-label="Go to slide 1"
          on:click={() => handleSlideChange(0)}
        ></button>
        <button 
          class="carousel-dot" 
          class:active={currentSlide === 1}
          aria-label="Go to slide 2"
          on:click={() => handleSlideChange(1)}
        ></button>
        <button 
          class="carousel-dot" 
          class:active={currentSlide === 2}
          aria-label="Go to slide 3"
          on:click={() => handleSlideChange(2)}
        ></button>
      </nav>
    </figure>
  </article>

  <article id="login-article">
    <h1>JL CMS <span>Login</span></h1>
    <p>
      Log in om toegang te krijgen tot de backend en je website eenvoudig te
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
</main>

<style>
  main {
    background-color: var(--light-beige);
    width: 100%;
    padding: .5rem;
    border-radius: 1rem;
    box-shadow: 0 10px 30px rgb(var(--black-rgb), 0.2);
    display: flex;
    gap: 2rem;
  }

  main article#carousel-article {
    display: none;

    @media (min-width: 1024px){
      display: block;
      flex: 0 1 50%;
      background-color: rgb(var(--charcoal-rgb), 0.3);
    }
  }

  

  
  /* ----------------------------------- */

  main article#login-article {
    padding: .5rem;

    @media (min-width: 1024px){
      flex: 0 1 50%;
    }
  }

  #login-article h1 {
    font-size: 2.8rem;
    font-weight: 600;
    color: var(--charcoal);
    margin-bottom: 1rem;
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
    width: 100%;
    height: 2rem;
    border-radius: 2rem;
    border: 2px solid var(--slate-grey);
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
