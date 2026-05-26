<template>
  <footer class="border-t border-primary/10 bg-gradient-to-r from-[#FF0000] via-[#D60000] to-slate-950 text-slate-400">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- About Section -->
        <div class="col-span-1 md:col-span-2">
          <h3 class="text-2xl font-bold mb-4 text-white">{{ siteTitle }}</h3>
          <p class="text-slate-300 mb-4">
            {{ siteDescription }}
          </p>
          <div class="flex space-x-4">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              target="_blank"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-secondary hover:text-slate-950"
            >
              <i :class="social.icon"></i>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-semibold mb-4 text-white">Quick Links</h4>
          <ul class="space-y-2">
            <li v-for="item in footerMenus" :key="item.id">
              <router-link
                :to="item.path"
                class="text-slate-300 hover:text-secondary transition-colors"
              >
                {{ item.title }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h4 class="text-lg font-semibold mb-4 text-white">Contact Us</h4>
          <ul class="space-y-3 text-slate-300">
            <li class="flex items-start gap-2">
              <i class="fas fa-map-marker-alt mt-1"></i>
              <span>{{ contactAddress }}</span>
            </li>
            <li class="flex items-center gap-2">
              <i class="fas fa-phone"></i>
              <span>{{ contactPhone }}</span>
            </li>
            <li class="flex items-center gap-2">
              <i class="fas fa-envelope"></i>
              <span>{{ contactEmail }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright -->
      <div class="mt-8 border-t border-slate-800 pt-8 text-center text-slate-400">
        <p>&copy; {{ currentYear }} {{ siteTitle }}. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import API_ENDPOINTS from '@/config/api';

/* global defineProps */
const props = defineProps({
  settings: { type: Object, default: () => ({}) },
});

const footerMenus = ref([]);
const currentYear = new Date().getFullYear();

const siteTitle = computed(() => props.settings?.site_title || 'Klinik Kecantikan');
const siteDescription = computed(() => props.settings?.site_description || 'Klinik kecantikan profesional dengan pelayanan terbaik, teknologi modern terpercaya, dan terapis berpengalaman untuk mewujudkan kulit sehat bersinar impian Anda.');
const contactAddress = computed(() => props.settings?.contact_address || 'Jakarta, Indonesia');
const contactPhone = computed(() => props.settings?.contact_phone || '+62 812 3456 7890');
const contactEmail = computed(() => props.settings?.contact_email || 'hello@beautyclinic.com');

const socialLinks = ref([
  { name: 'Facebook', icon: 'fab fa-facebook-f', url: '#' },
  { name: 'Twitter', icon: 'fab fa-twitter', url: '#' },
  { name: 'Instagram', icon: 'fab fa-instagram', url: '#' },
  { name: 'LinkedIn', icon: 'fab fa-linkedin-in', url: '#' },
]);

const defaultFooterMenus = [
  { id: 1, title: 'Home', path: '/' },
  { id: 2, title: 'Listing', path: '/listing' },
  { id: 3, title: 'Contact', path: '/contact' },
  { id: 4, title: 'Help', path: '/help' },
];

const fetchFooterMenu = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.FOOTER_MENU);
    const items = response?.data?.data || response?.data || [];
    
    if (items.length > 0) {
      footerMenus.value = items.map(item => ({
        id: item.id,
        title: item.title || item.label || item.name,
        path: item.path || item.url || item.link || '/',
      }));
    } else {
      footerMenus.value = defaultFooterMenus;
    }
  } catch (error) {
    console.warn('Failed to fetch footer menu, using defaults', error);
    footerMenus.value = defaultFooterMenus;
  }
};

onMounted(() => {
  fetchFooterMenu();
});
</script>
