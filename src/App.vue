<template>
  <div id="app" class="min-h-screen">
    <NavbarApp :settings="siteInfo" :menuItems="menuItems" />
    <router-view :pageData="pageData" />
    <FooterPage :settings="siteInfo" />
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import NavbarApp from './components/NavbarApp.vue';
import FooterPage from './components/FooterPage.vue';

const siteInfo = inject('siteInfo', {});
const menuItems = ref([]);
const pageData = ref({});

onMounted(() => {
  // Menu items and page data will be fetched by individual components
  // This provides a central place for shared state if needed
});
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
