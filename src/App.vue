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
body {
  font-family: Arial, Helvetica, sans-serif;
}

#app {
  padding: 16px;
}

button,
input,
select,
textarea {
  font-family: inherit;
}
</style>