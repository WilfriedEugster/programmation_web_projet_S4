<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>

<template>
<header>
    <h1>Poems</h1>
    <nav>
        <ul>
            <li><RouterLink to="/">Home</RouterLink></li>
            <li><RouterLink to="/search">Search</RouterLink></li>
            <li><RouterLink to="/quiz">Quiz</RouterLink></li>
        </ul>
    </nav>
</header>
</template>

<style scoped>

nav ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;

}
</style>