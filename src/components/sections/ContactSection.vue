<template>
  <section class="section-container relative">
    <div class="contact-shell relative overflow-hidden rounded-[2.5rem] p-6 md:p-12">
      <!-- Premium Glassmorphic & Radial Soft Glow Overlay -->
      <div class="absolute inset-0 bg-gradient-to-br from-white via-[#DFF1F1]/30 to-[#F5F5F5]"></div>
      <div class="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-[#FF0000]/5 blur-[120px]"></div>
      <div class="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[#BBD5DA]/20 blur-[130px]"></div>

      <div class="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
        <!-- Left Side: Main Info Card -->
        <div class="contact-main-card p-8 md:p-10">
          <span class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-red-600 bg-red-50 border border-red-200/50">
            <i class="fas fa-headset text-[10px]"></i>
            {{ sectionState.badge }}
          </span>
          <h2 class="mt-6 text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900 tracking-tight">
            {{ sectionState.title }}
          </h2>
          <p class="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-slate-600 font-medium">
            {{ sectionState.subtitle }}
          </p>
          <router-link
            :to="sectionState.buttonLink"
            class="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold text-sm shadow-md shadow-red-600/10 hover:shadow-lg hover:shadow-red-600/20 transform hover:-translate-y-0.5 transition-all duration-300 gap-2 mt-8"
          >
            <span>{{ sectionState.buttonText }}</span>
            <i class="fas fa-arrow-right text-xs"></i>
          </router-link>
        </div>

        <!-- Right Side: Contact Info Grid -->
        <div class="grid content-center gap-5">
          <div
            v-for="(info, index) in sectionState.contactInfo"
            :key="index"
            class="contact-info-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div class="flex items-start gap-5">
              <!-- Circular Icon with rich red gradient glow -->
              <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-red-500 text-white shadow-lg shadow-red-600/10">
                <i :class="info.icon || 'fas fa-info'" class="text-lg"></i>
              </div>
              <div class="min-w-0">
                <h3 class="font-bold text-slate-900 text-base">{{ info.title }}</h3>
                <a
                  v-if="info.link || info.Link"
                  :href="info.link || info.Link"
                  class="mt-1 block break-all text-sm text-slate-600 transition-colors hover:text-red-600 font-medium"
                >
                  {{ info.link || info.Link }}
                </a>
                <p v-else class="mt-1 text-sm text-slate-600 font-medium leading-relaxed">{{ info.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

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
  badge: 'Hubungi Kami',
  title: 'Konsultasikan Kebutuhan Perawatan Kecantikan Anda',
  subtitle:
    'Hubungi kami untuk mendapatkan informasi treatment, konsultasi dokter, dan rekomendasi perawatan terbaik sesuai kebutuhan kulit Anda',
  buttonText: 'Hubungi Sekarang',
  buttonLink: '/contact',
  contactInfo: [
    {
      icon: 'fas fa-phone',
      title: 'Telepon',
      link: 'tel:+6281234567890',
    },
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      link: 'mailto:hello@beautyclinic.com',
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Alamat',
      content: 'Jakarta, Indonesia',
    },
  ],
};

const sectionState = ref({ ...baseSection });

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

  const badgeObj = getItemByTag('contact_home_badge28', source)[0] || {};
  const mainObj = getItemByTag('contact_home_main28', source)[0] || {};
  const infoObjs = getItemByTag('contact_home_info28', source);
  const buttonObj = getItemByTag('contact_home_button28', source)[0] || {};

  sectionState.value = {
    badge: getField(badgeObj, 'title', 'content') || baseSection.badge,
    title: getField(mainObj, 'title', 'heading') || baseSection.title,
    subtitle: getField(mainObj, 'content', 'subtitle') || baseSection.subtitle,
    buttonText: getField(buttonObj, 'title', 'text') || baseSection.buttonText,
    buttonLink: getField(buttonObj, 'link', 'url') || baseSection.buttonLink,
    contactInfo: infoObjs.length > 0
      ? infoObjs.map(info => ({
          icon: getField(info, 'icon', 'iconClass'),
          title: getField(info, 'title', 'name'),
          link: getField(info, 'link', 'Link'),
          content: getField(info, 'content', 'description'),
        }))
      : baseSection.contactInfo,
  };
};

watch(
  () => props.pageData,
  () => applyContentFromProps(),
  { deep: true, immediate: true }
);

onMounted(() => {
  applyContentFromProps();
});
</script>

<style scoped>
.contact-shell {
  border: 1px solid rgba(187, 213, 218, 0.4);
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 
    0 20px 50px -25px rgba(187, 213, 218, 0.25),
    inset 0 1px 1px 0 rgba(255, 255, 255, 0.6);
}

.contact-main-card {
  border: 1px solid rgba(255, 0, 0, 0.08);
  border-radius: 2rem;
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 10px 30px -15px rgba(255, 0, 0, 0.05);
}

.contact-info-card {
  border: 1px solid rgba(187, 213, 218, 0.35);
  border-radius: 1.5rem;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 4px 15px -2px rgba(187, 213, 218, 0.1);
}

.contact-info-card:hover {
  border-color: rgba(255, 0, 0, 0.2);
  box-shadow: 
    0 12px 25px -10px rgba(255, 0, 0, 0.05),
    0 0 0 1px rgba(255, 0, 0, 0.03);
}
</style>
