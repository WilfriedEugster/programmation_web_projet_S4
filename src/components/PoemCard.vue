<template>
  <article class="poem-card">
    <RouterLink class="poem-link" :to="'/poems/' + props.title">
      <strong class="poem-title">{{ props.title }}</strong>
      <span class="poem-meta">{{ props.author }}</span>
      <span class="poem-meta">{{ props.linecount }} lines</span>
    </RouterLink>
  </article>
</template>

<script setup>
const props = defineProps({
  title: String,
  author: String,
  linecount: String,
})
</script>

<style scoped>
.poem-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  background: white;
  width: 100%;
  box-sizing: border-box;
}

.poem-link {
  display: block;
  text-align: left;
  padding: 10px 12px;
  color: inherit;
  text-decoration: none;
}

.poem-title {
  display: block;
}

.poem-meta {
  display: block;
  margin-top: 4px;
  font-size: 0.95rem;
  color: #555;
}
</style>