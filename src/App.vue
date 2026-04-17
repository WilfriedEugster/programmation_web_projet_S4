<template>
  <div id="app">
    <Header />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";

</script>

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
}

button,
input,
select,
textarea {
  font-family: inherit;
}
</style>