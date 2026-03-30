<template>
  <div>
    <h2>Search</h2>
    <div id="gallery-options">
      <input type="text" v-model="search" placeholder="Search poem" />
      <label for="poem-sort">Sort by : </label>
      <select v-model="poemsSortBy" id="poem-sort">
        <option value="linecount">Linecount</option>
        <option value="author">Author</option>
        <option value="title">Title</option>
      </select>
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

const search = ref('')
const poemsSortBy = ref('linecount')

const filteredPoemsData = computed(() => {
  let result = poemsData.filter(
    (poem) => poem.title.toLowerCase().includes(search.value.toLowerCase())
  )
  result = result.toSorted((a, b) => {
    if (poemsSortBy.value === 'linecount') {
      // linecount can be null
      return (a.linecount || 0) - (b.linecount || 0)
    } else if (poemsSortBy.value === 'author') {
      // sort in alphabetical order
      return a.author.localeCompare(b.author)
    } else if (poemsSortBy.value === 'title') {
      // sort in alphabetical order
      return a.title.localeCompare(b.title)
    }
  })
  return result
})
</script>

<style scoped>
#poem-gallery {
  display: flex;
  flex-wrap: wrap;
}
</style>