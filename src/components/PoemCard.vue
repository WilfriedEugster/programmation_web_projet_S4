<template>
  <div id="poem-card">
    <div id="poem-description">
      <h3>{{ props.title }}</h3>
      <p class="poem-description-line">{{ props.author }}</p>
      <p class="poem-description-line">{{ props.linecount }} lines</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  author: String,
  linecount: Number,
})
</script>

<style scoped>
#poem-card {
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  margin: 10px;
}

#poem-description {
  padding: 10px;
  color: #000000;
}

#poem-description h3 {
  font-size: 18px;
  margin: 0;
}

.poem-description-line {
  color: #353535;
  font-size: 12px;
  margin: 5px 0;
}
</style>