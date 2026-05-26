<template>
  <section class="section-container">
    <div class="section-head">
      <span class="section-kicker">{{ sectionState.badge }}</span>
      <h2 class="section-title">{{ sectionState.title }}</h2>
      <p class="section-subtitle">{{ sectionState.subtitle }}</p>
    </div>

    <div class="mb-10 flex flex-wrap justify-center gap-3">
      <button
        v-for="category in categories"
        :key="category.id"
        @click="selectedCategory = category.id"
        :class="[
          'category-pill rounded-full border px-5 py-2.5 text-sm font-semibold transition-all md:text-base',
          selectedCategory === category.id
            ? 'category-pill-active'
            : 'category-pill-idle'
        ]"
      >
        {{ category.name }}
      </button>
    </div>

    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="listing in filteredListings.slice(0, 6)"
        :key="listing.post_id"
        class="group card cursor-pointer overflow-hidden"
        @click="$router.push(`/listing/${listing.post_id}`)"
      >
        <div class="relative h-64 overflow-hidden">
          <img
            :src="listing.post?.thumbnail_url || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&q=80'"
            :alt="listing.post?.title"
            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent"></div>
          <div class="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-700">
            Solution
          </div>
          <div class="absolute right-4 top-4 rounded-full bg-gradient-to-r from-teal-700 to-teal-500 px-3 py-1 text-sm font-bold text-white shadow-md">
            {{ formatPrice(listing.price) }}
          </div>
        </div>
        <div class="p-6">
          <h3 class="mb-2 text-xl font-bold text-slate-900 line-clamp-2">
            {{ listing.post?.title }}
          </h3>
          <p class="mb-4 text-sm text-slate-600 line-clamp-2">
            {{ listing.post?.excerpt }}
          </p>
          <div class="flex items-center justify-between text-sm text-slate-500">
            <div class="flex items-center">
              <i class="fas fa-map-marker-alt mr-2 text-teal-700"></i>
              {{ listing.kabupaten }}, {{ listing.provinsi }}
            </div>
            <span class="font-semibold text-teal-700 group-hover:text-slate-900">Detail</span>
          </div>
        </div>
      </article>
    </div>

    <div class="mt-12 text-center">
      <router-link :to="sectionState.buttonLink" class="btn-primary">
        {{ sectionState.buttonText }}
        <i class="fas fa-arrow-right"></i>
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import axios from 'axios';
import API_ENDPOINTS from '@/config/api';

const HOME_PAGE = 'Home';
const HOME_STORAGE_KEY = `customPageData:${HOME_PAGE}`;

/* global defineProps */
const props = defineProps({
  pageData: {
    type: Object,
    default: () => ({}),
  },
});

const baseSection = {
  badge: 'Layanan Kecantikan',
  title: 'Temukan Perawatan Terbaik untuk Anda',
  subtitle:
    'Eksplorasi berbagai treatment wajah dan tubuh yang dirancang untuk membantu Anda tampil lebih sehat, segar, dan percaya diri',
  buttonText: 'Lihat Semua Perawatan',
  buttonLink: '/listing',
};

const sectionState = ref({ ...baseSection });
const listings = ref([]);
const categories = ref([{ id: null, name: 'Semua' }]);
const selectedCategory = ref(null);

const LISTING_TYPE = window.LISTING_TYPE || 1;
const LISTING_DISPLAY_IN = window.LISTING_DISPLAY_IN || 8;

const filteredListings = computed(() => {
  if (!selectedCategory.value) return listings.value;
  return listings.value.filter(listing =>
    listing.post?.categories?.some(cat => cat.id === selectedCategory.value)
  );
});

const formatPrice = (price) => {
  if (!price) return 'Hubungi Kami';
  const num = parseFloat(price);
  if (isNaN(num)) return price;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(num);
};

const fetchCategories = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.listings, {
      params: { listing_type: LISTING_TYPE }
    });
    const data = response.data.data || response.data || [];
    
    const categoriesMap = {};
    data
      .filter(listing => listing.listing_type === LISTING_TYPE)
      .forEach(listing => {
        (listing.post?.categories || []).forEach(cat => {
          if (cat.display_in === LISTING_DISPLAY_IN) {
            categoriesMap[cat.id] = {
              id: cat.id,
              name: cat.name,
              slug: cat.slug
            };
          }
        });
      });
    
    categories.value = [
      { id: null, name: 'Semua' },
      ...Object.values(categoriesMap)
    ];
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

const fetchListings = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.listings, {
      params: { listing_type: LISTING_TYPE }
    });
    const data = response?.data?.data || response?.data || [];
    listings.value = data.filter(listing => listing.listing_type === LISTING_TYPE);
  } catch (error) {
    console.warn('Failed to fetch listings', error);
  }
};

const getCachedHomeData = () => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(HOME_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn('Failed to read cached home data', error);
    return null;
  }
};

const parse = (data) => {
  if (!data) return null;
  if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch (err) {
      return null;
    }
  }
  return data;
};

const getItemByTag = (tag, allData) => {
  const section = allData?.[tag];
  if (!section) return [];
  const parseItem = (item) => parse(item) || {};
  return Array.isArray(section) ? section.map(parseItem) : [parseItem(section)];
};

const applyContentFromProps = () => {
  const cached = getCachedHomeData();
  const source =
    (props.pageData && Object.keys(props.pageData || {}).length && props.pageData) ||
    cached ||
    {};

  const getField = (obj, key1, key2) => (obj ? obj[key1] || obj[key2] || '' : '');

  const badgeObj = getItemByTag('propertyList_badge28', source)[0] || {};
  const mainObj = getItemByTag('propertyList_main28', source)[0] || {};
  const buttonObj = getItemByTag('propertyList_button28', source)[0] || {};

  sectionState.value = {
    badge: getField(badgeObj, 'title', 'content') || baseSection.badge,
    title: getField(mainObj, 'title', 'heading') || baseSection.title,
    subtitle: getField(mainObj, 'content', 'subtitle') || baseSection.subtitle,
    buttonText: getField(buttonObj, 'title', 'text') || baseSection.buttonText,
    buttonLink: getField(buttonObj, 'link', 'url') || baseSection.buttonLink,
  };
};

watch(
  () => props.pageData,
  () => applyContentFromProps(),
  { deep: true, immediate: true }
);

onMounted(() => {
  applyContentFromProps();
  fetchCategories();
  fetchListings();
});
</script>

<style scoped>
.category-pill {
  border-color: rgba(148, 163, 184, 0.4);
}

.category-pill-active {
  border-color: rgba(255, 0, 0, 0.8);
  background: linear-gradient(140deg, #FF0000, #FF4D4D);
  color: #fff;
  box-shadow: 0 16px 26px -18px rgba(255, 0, 0, 0.8);
}

.category-pill-idle {
  background: rgba(255, 255, 255, 0.92);
  color: rgb(51, 65, 85);
}

.category-pill-idle:hover {
  border-color: rgba(255, 0, 0, 0.4);
  color: #FF0000;
}
</style>
