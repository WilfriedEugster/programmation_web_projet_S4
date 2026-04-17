<template>
  <div>
    <h2>Search</h2>
    <div id="gallery-options">
      <label for="search-by-title">Search by title: 
        <input type="text" v-model="searchByTitle" placeholder="Poem title" />
      </label>
      <label for="search-by-author">Search by author: 
        <input type="text" v-model="searchByAuthor" placeholder="Poem author" />
      </label>
      <label for="min-line-count">Minimum line count: 
        <input type="number" v-model="minLineCount" placeholder="Minimum line count" min="0" />
      </label>
      <label for="max-line-count">Maximum line count: 
        <input type="number" v-model="maxLineCount" placeholder="Maximum line count" min="0" />
      </label>
    </div>
    <div id="poem-gallery">
      <PoemCard
        v-for="poem in filteredPoemsData"
        :key="poem.title"
        :title="poem.title"
        :author="poem.author"
        :linecount="poem.linecount"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import poemsData from '../William Shakespeare.json'
import PoemCard from './PoemCard.vue'

const smallestLineCount = poemsData.reduce((min, poem) => {
  const lineCount = Number(poem.linecount)
  return Number.isFinite(lineCount) ? Math.min(min, lineCount) : min
}, Infinity)
const largestLineCount = poemsData.reduce((max, poem) => {
  const lineCount = Number(poem.linecount)
  return Number.isFinite(lineCount) ? Math.max(max, lineCount) : max
}, 0)

const minLineCount = ref(smallestLineCount)
const maxLineCount = ref(largestLineCount)

const searchByTitle = ref('')
const searchByAuthor = ref('')

const filteredPoemsData = computed(() => {
  let result = poemsData.filter(
    (poem) =>
      poem.title.toLowerCase().includes(searchByTitle.value.toLowerCase()) &&
      poem.author.toLowerCase().includes(searchByAuthor.value.toLowerCase()) &&
      (poem.linecount || 0) >= minLineCount.value &&
      (poem.linecount || 0) <= maxLineCount.value
  )
  result = result.filter((poem) => poem.linecount !== null)
  return result
})
</script>

<style scoped>
#gallery-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}
#poem-gallery {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}
</style>