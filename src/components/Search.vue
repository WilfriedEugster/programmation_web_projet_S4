<template>
  <div>
    <h2>Search</h2>
    <p v-if="isLoading" class="loading-text">Loading poems...</p>
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
        v-for="poem in paginatedPoemsData"
        :key="poem.title"
        :title="poem.title"
        :author="poem.author"
        :linecount="poem.linecount"
      />
    </div>
    <div v-if="totalPages > 1" class="pagination">
      <button :disabled="currentPage === 1" @click="goToPreviousPage">
        Previous
      </button>
      <p class="pagination-status">
        Page {{ currentPage }} / {{ totalPages }}
      </p>
      <button :disabled="currentPage === totalPages" @click="goToNextPage">
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import PoemCard from './PoemCard.vue'
import { fetchShakespearePoems } from '../service/poemsApi'

const poemsPerPage = 18

const poemsData = ref([])
const isLoading = ref(false)

const minLineCount = ref(0)
const maxLineCount = ref(0)

const searchByTitle = ref('')
const currentPage = ref(1)

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

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredPoemsData.value.length / poemsPerPage))
})

const paginatedPoemsData = computed(() => {
  const startIndex = (currentPage.value - 1) * poemsPerPage
  return filteredPoemsData.value.slice(startIndex, startIndex + poemsPerPage)
})

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1
  }
}

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1
  }
}

watch([searchByTitle, minLineCount, maxLineCount], () => {
  currentPage.value = 1
})

watch(totalPages, (newTotalPages) => {
  if (currentPage.value > newTotalPages) {
    currentPage.value = newTotalPages
  }
})

onMounted(async () => {
  isLoading.value = true
  try {
    poemsData.value = await fetchShakespearePoems()
    syncLineCountBounds(poemsData.value)
  } finally {
    isLoading.value = false
  }
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

.loading-text {
  margin: 0 0 12px;
  font-style: italic;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.pagination-status {
  margin: 0;
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