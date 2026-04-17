<template>
  <div v-if="poem">
    <h2>{{ poem.title }}</h2>
    <p>{{ poem.author }}</p>
    <p>{{ poem.linecount }} lines</p>
    <div id="poem-lines">
      <p v-for="(line, index) in poem.lines" :key="index">{{ line }}</p>
    </div>

  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import poemsData from '../William Shakespeare.json';

const poem = ref(null);
const route = useRoute();

const fetchPoemDetails = () => {
  const id = route.params.id;
  const poemData = poemsData.find((poem) => poem.title === id);
  poem.value = {
    id: id,
    title: poemData.title,
    author: poemData.author,
    linecount: poemData.linecount,
    lines: poemData.lines
  };
};
fetchPoemDetails();
</script>