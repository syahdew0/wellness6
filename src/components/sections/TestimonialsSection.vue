<template>
  <section class="section-container">
    <div class="section-head">
      <span class="section-kicker">{{ sectionState.badge }}</span>
      <h2 class="section-title">{{ sectionState.title }}</h2>
      <p class="section-subtitle">{{ sectionState.subtitle }}</p>
    </div>

    <div class="grid grid-cols-1 gap-7 md:grid-cols-3">
      <article
        v-for="testimonial in testimonials"
        :key="testimonial.id || testimonial.name"
        class="testimonial-card relative p-8"
      >
        <div class="mb-5 text-teal-700/20">
          <i class="fas fa-quote-left text-3xl"></i>
        </div>
        <div class="mb-4 flex items-center">
          <div class="flex text-yellow-500">
            <i v-for="star in 5" :key="star" class="fas fa-star"></i>
          </div>
        </div>
        <p class="mb-6 text-slate-600 italic">{{ testimonial.content }}</p>
        <div class="flex items-center gap-4 border-t border-slate-200 pt-5">
          <div
            class="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-teal-700 to-cyan-500 text-xs font-bold text-white"
          >
            <img
              v-if="testimonial.avatar"
              :src="testimonial.avatar"
              :alt="testimonial.name"
              class="h-full w-full object-cover"
            />
            <span v-else>{{ getInitials(testimonial.name) }}</span>
          </div>
          <div>
            <h4 class="font-bold text-slate-900">{{ testimonial.name }}</h4>
            <p class="text-sm text-slate-500">{{ testimonial.role }}</p>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';
import API_ENDPOINTS from '@/config/api';

/* global defineProps */
const props = defineProps({
  pageData: {
    type: Object,
    default: () => ({}),
  },
});

const HOME_PAGE = 'Home';
const HOME_STORAGE_KEY = `customPageData:${HOME_PAGE}`;

const baseSection = {
  badge: 'Testimoni',
  title: 'Apa Kata Customer Kami?',
  subtitle:
    'Kepuasan dan kepercayaan pelanggan adalah prioritas utama kami. Berikut pengalaman mereka setelah melakukan perawatan di klinik kami.',
};

const sectionState = ref({ ...baseSection });
const testimonials = ref([]);
const isLoading = ref(true);

const fallbackTestimonials = [
  {
    id: 1,
    name: 'Amanda Putri',
    role: 'Content Creator',
    avatar: null,
    content:
      '"Kulit wajah saya jadi lebih cerah dan sehat setelah rutin treatment di sini. Pelayanannya juga sangat ramah dan profesional."',
  },
  {
    id: 2,
    name: 'Nadia Rahma',
    role: 'Karyawan Swasta',
    avatar: null,
    content:
      '"Dokternya sangat informatif dan membantu memilih treatment yang sesuai dengan kondisi kulit saya. Hasilnya memuaskan!"',
  },
  {
    id: 3,
    name: 'Cindy Marlina',
    role: 'Entrepreneur',
    avatar: null,
    content:
      '"Tempatnya nyaman, treatment modern, dan staff-nya perhatian banget. Sekarang saya jadi lebih percaya diri."',
  },
];

const getInitials = (name) => {
  if (!name) return '?';
  const parts = String(name).trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return String(name).slice(0, 2).toUpperCase();
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

const stripHtml = (html) => {
  if (!html) return '';
  if (typeof window === 'undefined' || typeof DOMParser === 'undefined') return String(html);
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

const formatContent = (content) => {
  const text = stripHtml(content).trim();
  return text ? `"${text}"` : '""';
};

const applyContentFromProps = () => {
  const cached = getCachedHomeData();
  const source =
    (props.pageData && Object.keys(props.pageData || {}).length && props.pageData) ||
    cached ||
    {};

  const getField = (obj, key1, key2) => (obj ? obj[key1] || obj[key2] || '' : '');

  const badgeObj = getItemByTag('testimoni_badge28', source)[0] || {};
  const titleObj = getItemByTag('testimoni_title28', source)[0] || {};

  sectionState.value = {
    badge: getField(badgeObj, 'title', 'content') || baseSection.badge,
    title: getField(titleObj, 'title', 'heading') || baseSection.title,
    subtitle: getField(titleObj, 'content', 'subtitle') || baseSection.subtitle,
  };
};

const fetchTestimonials = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get(API_ENDPOINTS.testimonials);
    const data = response?.data?.data || response?.data || [];

    testimonials.value = (Array.isArray(data) ? data : []).map(item => ({
      id: item.id,
      name: item.author_name || item.title || 'Anonim',
      role: item.author_position || item.excerpt || '',
      avatar: item.thumbnail_url || null,
      content: formatContent(item.content || ''),
    }));

    if (!testimonials.value.length) {
      testimonials.value = fallbackTestimonials;
    }
  } catch (error) {
    console.warn('Failed to fetch testimonials, using defaults', error);
    testimonials.value = fallbackTestimonials;
  } finally {
    isLoading.value = false;
  }
};

watch(
  () => props.pageData,
  () => applyContentFromProps(),
  { deep: true, immediate: true }
);

onMounted(() => {
  applyContentFromProps();
  fetchTestimonials();
});
</script>

<style scoped>
.testimonial-card {
  border: 1px solid rgba(187, 213, 218, 0.35);
  border-radius: 1.5rem;
  background:
    linear-gradient(140deg, rgba(255, 255, 255, 0.96), rgba(223, 241, 241, 0.2)),
    linear-gradient(180deg, rgba(255, 0, 0, 0.02), rgba(255, 255, 255, 0));
}
</style>
