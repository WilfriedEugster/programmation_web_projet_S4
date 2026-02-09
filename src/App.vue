<template>
  <div>
    <h1>Poems</h1>
    <div id="poem-gallery">
      <PoemCard
        v-for="poem in poemData"
        :key="poem.id"
        :title="poem.title"
        :author="poem.author"
        :linecount="poem.linecount"
      />
    </div>
  </div>
</template>

<script setup>
import poemData from './William Shakespeare.json'
import PoemCard from './components/PoemCard.vue'
</script>

<style scoped>
#poem-gallery {
  display: flex;
  flex-wrap: wrap;
}
</style>