import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/Home.vue";
import Search from "@/components/Search.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/search", component: Search },
  { path: "/:pathMatch(.*)", redirect: "/" },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});