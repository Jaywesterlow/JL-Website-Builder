<script>
  import { Link01 } from "$lib";
</script>

<header>
  <a href=""><img src="/images/Logo-lauralisa.nl-wit.png" alt="LAURALISA logo" /></a>
  <Link01
    url={"/"}
    text={"Terug naar site"}
    label={"Link terug naar de hoofdsite"}
    
    color={"var(--light-beige)"}
    backgroundColor={"rgb(var(--light-beige-rgb), 0.3)"}
    
    iconPosition={"right"}
    iconSize={"15px"}
  ></Link01>

</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem 0 3rem 0;
  }

  header a img {
    max-height: 3.5rem;
  }

  
</style>
