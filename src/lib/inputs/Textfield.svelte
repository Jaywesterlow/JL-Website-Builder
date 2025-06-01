<script>
  import { createEventDispatcher } from 'svelte';

  let {
    placeholder = "Typ iets...",
    value = ""
  } = $props();

  let input;
  let submittedViaEnter = $state(false);
  let lastValue = $state("");

  const dispatch = createEventDispatcher();

  function submit() {
    if (value.trim() === "") {
      value = lastValue; // ⬅️ herstel waarde in tekstveld
    } else {
      lastValue = value;
    }

    dispatch('submit', { value });
  }

  function handleSubmit(submit) {
    submit.preventDefault();
    submit();
  }

  function handleInput(input) {
    value = input.target.value;
    if (value.trim() !== "") {
      lastValue = value;
    }
  }

  function handleBlur() {
    if (!submittedViaEnter) {
      submit();
    }
    submittedViaEnter = false;
  }

  function handleKeydown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      submittedViaEnter = true;
      submit();
      input.blur();
    }
  }
</script>

<form onsubmit={handleSubmit} class="textfield-form">
  <label for="textfield-input">Invoer</label>
  <input
    id="textfield-input"
    type="text"
    bind:value
    bind:this={input}
    oninput={handleInput}
    onblur={handleBlur}
    onkeydown={handleKeydown}
    {placeholder}
    aria-label="Invoer veld"
  />
</form>

<style>
  .textfield-form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  label {
    margin-bottom: 0.5rem;
    font-weight: 300;
    font-size: clamp(0.75rem, 1vw + 0.5rem, 1rem);
  }

  input {
    width: 100%;
    padding: .35rem;
    border: 2px solid var(--terracotta);
    border-radius: var(--radius-sm);
    background-color: var(--pure-white);
    transition: all 0.2s ease;
  }

  input:focus {
    outline: none;
    border-color: var(--cocoa-brown);
    box-shadow: var(--shadow-lg);
  }
</style>
