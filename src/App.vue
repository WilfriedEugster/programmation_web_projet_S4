<template>
  <div id="app">
    <Header />
    <RouterView />
    <Footer />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<style>
:root {
  --font-size-xs: 0.85rem;
  --font-size-sm: 0.95rem;
  --font-size-base: 1rem;
  --font-size-h3: 1.15rem;
  --font-size-h2: 1.5rem;
  --font-size-h1: 2rem;
  --ui-border-color: #ccc;
  --ui-radius: 8px;
  --ui-bg: white;
  --ui-padding-sm: 8px 12px;
  --ui-padding-md: 10px 12px;
}

body {
  font-family: Georgia, "Times New Roman", Times, serif;
  font-size: var(--font-size-base);
  line-height: 1.4;
}

#app {
  padding: 24px;
}

@media (max-width: 600px) {
  :root {
    --font-size-h1: 1.5rem;
    --font-size-h2: 1.25rem;
  }

  #app {
    padding: 12px;
  }
}

h1 {
  font-size: var(--font-size-h1);
}

h2 {
  font-size: var(--font-size-h2);
}

h3 {
  font-size: var(--font-size-h3);
}

p,
label,
blockquote,
a,
li {
  font-size: var(--font-size-base);
}

button,
input,
select,
textarea {
  font-family: inherit;
  font-size: var(--font-size-base);
}

button {
  transition: background-color 0.25s ease;
}

button:not(:disabled):not(.choice-correct):not(.choice-wrong):hover {
  background-color: #e0e0e0;
}
</style>