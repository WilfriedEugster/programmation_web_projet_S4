<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>

<template>
<header>
    <h1>Poems</h1>
    <nav>
        <ul>
            <li><RouterLink class="nav-link" to="/">Home</RouterLink></li>
            <li><RouterLink class="nav-link" to="/search">Search</RouterLink></li>
            <li><RouterLink class="nav-link" to="/quiz">Quiz</RouterLink></li>
        </ul>
    </nav>
</header>
</template>

<style scoped>

h1 {
    text-transform: uppercase;
}

nav ul {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    list-style: none;
    padding: 0;

}

.nav-link {
    display: inline-block;
    border: 1px solid var(--ui-border-color);
    border-radius: var(--ui-radius);
    padding: var(--ui-padding-sm);
    background: var(--ui-bg);
    color: inherit;
    text-decoration: none;
    transition: background-color 0.25s ease;
    font-weight: 600;
}

.nav-link:hover {
    background-color: #e0e0e0;
}

.nav-link.router-link-active {
    color: #ccc;
}
</style>