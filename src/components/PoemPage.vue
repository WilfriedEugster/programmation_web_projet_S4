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
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { fetchShakespearePoems } from '../service/poemsApi';

const poem = ref(null);
const route = useRoute();

const fetchPoemDetails = async () => {
  const id = route.params.id;
  const poemsData = await fetchShakespearePoems();
  const poemData = poemsData.find((poem) => poem.title === id);

  if (!poemData) {
    poem.value = null;
    return;
  }

  poem.value = {
    id: id,
    title: poemData.title,
    author: poemData.author,
    linecount: poemData.linecount,
    lines: poemData.lines
  };
};

onMounted(() => {
  fetchPoemDetails();
});
</script>