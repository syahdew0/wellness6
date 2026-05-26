<template>
  <main class="text-slate-900">
    <section id="home" class="ui-band ui-band-hero"><HeroSection :pageData="pageData" /></section>
    <section id="about" class="ui-band ui-band-mint"><AboutSection :pageData="pageData" /></section>
    <section id="properties" class="ui-band ui-band-sand"><CompanyListSection :pageData="pageData" /></section>
    <section id="services" class="ui-band ui-band-mint"><ServicesSection :pageData="pageData" /></section>
    <section id="testimonials" class="ui-band ui-band-sky"><TestimonialsSection :pageData="pageData" /></section>
    <section id="faq" class="ui-band ui-band-mint"><FAQSection :pageData="pageData" /></section>
    <section id="contact" class="ui-band ui-band-sand"><ContactSection :pageData="pageData" /></section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import API_ENDPOINTS from '@/config/api';
import HeroSection from '@/components/sections/HeroSection.vue';
import AboutSection from '@/components/sections/AboutSection.vue';
import CompanyListSection from '@/components/sections/companyListSection.vue';
import ServicesSection from '@/components/sections/ServicesSection.vue';
import TestimonialsSection from '@/components/sections/TestimonialsSection.vue';
import FAQSection from '@/components/sections/FAQSection.vue';
import ContactSection from '@/components/sections/ContactSection.vue';

const HOME_PAGE = 'Home';
const HOME_STORAGE_KEY = `customPageData:${HOME_PAGE}`;

const pageData = ref({});

const fetchPageData = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.customPages, {
      params: {
        isFrontend: true,
        page: HOME_PAGE,
      },
    });
    
    const data = response?.data?.data || response?.data || {};
    pageData.value = data;
    
    // Cache to localStorage
    localStorage.setItem(HOME_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to fetch page data, using cached data', error);
    
    // Try to load from cache
    try {
      const cached = localStorage.getItem(HOME_STORAGE_KEY);
      if (cached) {
        pageData.value = JSON.parse(cached);
      }
    } catch (cacheError) {
      console.error('Failed to load cached data', cacheError);
    }
  }
};

onMounted(() => {
  fetchPageData();
});
</script>

<style scoped>
.ui-band {
  position: relative;
  overflow: hidden;
}

.ui-band::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.ui-band-hero {
  background: linear-gradient(180deg, #F5F5F5 0%, #DFF1F1 100%);
}

.ui-band-hero::before {
  background-image:
    radial-gradient(circle at 10% 16%, rgba(255, 0, 0, 0.05), transparent 26%),
    radial-gradient(circle at 92% 84%, rgba(187, 213, 218, 0.2), transparent 22%);
}

.ui-band-mint {
  background: linear-gradient(180deg, rgba(223, 241, 241, 0.4) 0%, rgba(245, 245, 245, 0.8) 100%);
}

.ui-band-mint::before {
  background-image:
    linear-gradient(rgba(255, 0, 0, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 0, 0, 0.03) 1px, transparent 1px);
  background-size: 38px 38px;
  opacity: 0.15;
}

.ui-band-sand {
  background: linear-gradient(180deg, rgba(245, 245, 245, 0.9) 0%, rgba(223, 241, 241, 0.5) 100%);
}

.ui-band-sand::before {
  background-image:
    radial-gradient(circle at 16% 18%, rgba(255, 0, 0, 0.04), transparent 22%),
    radial-gradient(circle at 90% 82%, rgba(187, 213, 218, 0.25), transparent 26%);
}

.ui-band-sky {
  background: linear-gradient(180deg, rgba(223, 241, 241, 0.5) 0%, rgba(245, 245, 245, 0.9) 100%);
}

.ui-band-sky::before {
  background-image:
    radial-gradient(circle at 12% 8%, rgba(255, 0, 0, 0.03), transparent 24%),
    radial-gradient(circle at 88% 90%, rgba(187, 213, 218, 0.2), transparent 26%);
}
</style>
