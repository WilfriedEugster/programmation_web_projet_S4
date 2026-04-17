<template>
  <div>
    <h2>Search</h2>
    <div id="gallery-options">
      <label for="search-by-title">Search by title: 
        <input type="text" v-model="searchByTitle" placeholder="Poem title" />
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
import { ref, computed, onMounted } from 'vue'
import PoemCard from './PoemCard.vue'
import { fetchShakespearePoems } from '../service/poemsApi'

const poemsData = ref([])

const minLineCount = ref(0)
const maxLineCount = ref(0)

const searchByTitle = ref('')

const syncLineCountBounds = (poems) => {
  const availableLineCounts = poems
    .map((poem) => Number(poem.linecount))
    .filter((lineCount) => Number.isFinite(lineCount))

  if (availableLineCounts.length === 0) {
    minLineCount.value = 0
    maxLineCount.value = 0
    return
  }

  minLineCount.value = Math.min(...availableLineCounts)
  maxLineCount.value = Math.max(...availableLineCounts)
}

const filteredPoemsData = computed(() => {
  let result = poemsData.value.filter(
    (poem) =>
      poem.title.toLowerCase().includes(searchByTitle.value.toLowerCase()) &&
      (poem.linecount || 0) >= minLineCount.value &&
      (poem.linecount || 0) <= maxLineCount.value
  )
  result = result.filter((poem) => poem.linecount !== null)
  return result
})

onMounted(async () => {
  poemsData.value = await fetchShakespearePoems()
  syncLineCountBounds(poemsData.value)
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

@media (max-width: 600px) {
  #gallery-options {
    flex-direction: column;
  }

  #gallery-options label {
    display: flex;
    flex-direction: column;
  }

  #poem-gallery {
    grid-template-columns: 1fr;
  }
}
</style>