<template>
  <p v-if="isLoading" class="loading-text">Loading poems...</p>
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
const isLoading = ref(false);
const route = useRoute();

const fetchPoemDetails = async () => {
  isLoading.value = true;
  const id = route.params.id;
  try {
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
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchPoemDetails();
});
</script>

<style scoped>
.loading-text {
  margin: 0 0 12px;
  font-style: italic;
}
</style>