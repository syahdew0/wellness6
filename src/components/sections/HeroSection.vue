<template>
  <section class="hero-shell">
    <div class="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 md:px-8 lg:px-10 lg:pb-14 lg:pt-10">
      <div class="hero-panel relative overflow-hidden rounded-[2.5rem] border border-slate-200/60 bg-white shadow-xl shadow-slate-900/5">
        <!-- Background accents -->
        <div class="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-red-100/40 blur-3xl"></div>
        <div class="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-cyan-100/30 blur-3xl"></div>

        <div class="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[580px]">
          <!-- Left Content Panel -->
          <div class="lg:col-span-7 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 relative z-10">
            <span class="hero-badge w-fit text-xs font-semibold uppercase tracking-[0.24em] rounded-full border border-red-500/25 bg-red-50/50 px-4 py-1.5 text-red-600 shadow-sm">
              {{ sectionState.badge }}
            </span>

            <h1 class="hero-title mt-6 text-4xl font-extrabold leading-[1.1] text-slate-900 sm:text-5xl md:text-6xl">
              {{ sectionState.title }} <br>
              <span class="text-gradient bg-gradient-to-r from-[#FF0000] to-[#BBD5DA] bg-clip-text text-transparent">{{ sectionState.highlight }}</span>
            </h1>

            <p class="mt-5 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg">
              {{ sectionState.subtitle }}
            </p>

            <div class="mt-8 flex flex-wrap gap-4">
              <router-link :to="sectionState.primaryButton.link" class="btn-primary shadow-lg shadow-red-900/20 hover:-translate-y-0.5 transition-transform">
                {{ sectionState.primaryButton.text }}
                <i class="fas fa-arrow-right text-xs"></i>
              </router-link>
              <router-link :to="sectionState.secondaryButton.link" class="btn-secondary hover:-translate-y-0.5 transition-transform">
                {{ sectionState.secondaryButton.text }}
              </router-link>
            </div>

            <!-- Security Label and Badges -->
            <div class="mt-10 flex flex-wrap items-center gap-6 border-t border-slate-100 pt-8">
              <div class="hero-security flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600 shadow-inner">
                  <i class="fas fa-shield-alt"></i>
                </div>
                <div class="text-left">
                  <p class="text-xs font-bold text-slate-800">{{ sectionState.security.title }}</p>
                  <p class="text-[10px] text-slate-400">{{ sectionState.security.content }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Image Panel -->
          <div class="lg:col-span-5 relative min-h-[360px] lg:min-h-full overflow-hidden">
            <div class="absolute inset-0 bg-slate-100">
              <img
                :src="sectionState.image"
                :alt="sectionState.imageTitle || 'Klinik Kecantikan'"
                class="h-full w-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            <!-- Elegant overlays -->
            <div class="absolute inset-0 bg-gradient-to-r from-white via-white/5 to-transparent lg:block hidden"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent lg:hidden block"></div>
            
            <!-- Float indicators -->
            <div class="absolute top-6 right-6 rounded-2xl border border-white/60 bg-white/80 p-4 backdrop-blur-md shadow-lg flex items-center gap-3 animate-bounce-slow">
              <div class="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white shadow-md shadow-red-500/20">
                <i :class="sectionState.floatingCard1.icon"></i>
              </div>
              <div class="text-left">
                <p class="text-xs font-extrabold text-slate-900">{{ sectionState.floatingCard1.title }}</p>
                <p class="text-[9px] text-slate-500">{{ sectionState.floatingCard1.content }}</p>
              </div>
            </div>

            <div class="absolute bottom-6 left-6 rounded-2xl border border-white/60 bg-white/80 p-4 backdrop-blur-md shadow-lg flex items-center gap-3 animate-bounce-slow delay-75">
              <div class="flex h-10 w-10 items-center justify-center rounded-full bg-teal-500 text-white shadow-md shadow-teal-500/20">
                <i :class="sectionState.floatingCard2.icon"></i>
              </div>
              <div class="text-left">
                <p class="text-xs font-extrabold text-slate-900">{{ sectionState.floatingCard2.title }}</p>
                <p class="text-[9px] text-slate-500">{{ sectionState.floatingCard2.content }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Attributes strip at the very bottom -->
        <div class="border-t border-slate-100 bg-slate-50/50 px-6 py-5 sm:px-12">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div
              v-for="(attr, index) in sectionState.attributes"
              :key="index"
              class="flex items-center justify-center gap-3 rounded-2xl border border-slate-200/50 bg-white px-5 py-3 shadow-sm hover:shadow-md transition-shadow"
            >
              <span class="text-xl font-black text-red-600 sm:text-2xl">{{ attr.value }}</span>
              <span class="text-xs font-medium text-slate-500 uppercase tracking-wider text-left">{{ attr.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

// Storage key untuk cache
const HOME_PAGE = 'Home';
const HOME_STORAGE_KEY = `customPageData:${HOME_PAGE}`;

/* global defineProps */
const props = defineProps({
  pageData: {
    type: Object,
    default: () => ({}),
  },
});

// Base/default values
const baseSection = {
  badge: 'Klinik Kecantikan',
  title: 'Wujudkan Kulit Sehat',
  highlight: 'dan Cantik Alami',
  subtitle:
    'Kami menghadirkan perawatan kecantikan modern dengan teknologi terpercaya untuk membantu Anda tampil lebih percaya diri setiap hari.',
  primaryButton: { text: 'Lihat Perawatan', link: '/#services' },
  secondaryButton: { text: 'Konsultasi Sekarang', link: '/contact' },
  image:
    'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1800&q=80',
  imageTitle: 'Perawatan Kecantikan Profesional',
  security: {
    title: 'Layanan Terpercaya',
    content: '100% Aman & Tersertifikasi',
  },
  floatingCard1: {
    title: 'BPOM Approved',
    content: 'Bahan Alami & Teruji',
    icon: 'fas fa-award',
  },
  floatingCard2: {
    title: 'Top Rated Clinic',
    content: 'Pilihan Utama Klien',
    icon: 'fas fa-heart',
  },
  attributes: [
    { value: '8+', label: 'Tahun Pengalaman' },
    { value: '5.000+', label: 'Klien Puas' },
    { value: '99%', label: 'Tingkat Kepuasan' },
  ],
};

const sectionState = ref({ ...baseSection });

// Helper: get cached home data from localStorage
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

// Helper: parse JSON string or return object
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

// Helper: get item by tag from all data
const getItemByTag = (tag, allData) => {
  const section = allData?.[tag];
  if (!section) return [];
  const parseItem = (item) => parse(item) || {};
  return Array.isArray(section) ? section.map(parseItem) : [parseItem(section)];
};

// Apply content from props or cache
const applyContentFromProps = () => {
  const cached = getCachedHomeData();
  const source =
    (props.pageData && Object.keys(props.pageData || {}).length && props.pageData) ||
    cached ||
    {};

  const getField = (obj, key1, key2) => (obj ? obj[key1] || obj[key2] || '' : '');

  // Get data from tags
  const badgeObj = getItemByTag('home_badge28', source)[0] || {};
  const mainObj = getItemByTag('home_main28', source)[0] || {};
  const primaryBtnObj = getItemByTag('home_buttonDaftar28', source)[0] || {};
  const secondaryBtnObj = getItemByTag('home_buttonKonsul28', source)[0] || {};
  const imageTitleObj = getItemByTag('home_image_title28', source)[0] || {};
  const securityObj = getItemByTag('home_security28', source)[0] || {};
  const floatCard1Obj = getItemByTag('home_badgeFloating1_28', source)[0] || {};
  const floatCard2Obj = getItemByTag('home_badgeFloating2_28', source)[0] || {};
  const atributObjs = getItemByTag('home_atribut28', source);

  sectionState.value = {
    badge: getField(badgeObj, 'title', 'content') || baseSection.badge,
    title: getField(mainObj, 'title', 'heading') || baseSection.title,
    highlight: getField(mainObj, 'highlight', 'subtitle') || baseSection.highlight,
    subtitle: getField(mainObj, 'content', 'subtitle') || baseSection.subtitle,
    primaryButton: {
      text: getField(primaryBtnObj, 'title', 'text') || baseSection.primaryButton.text,
      link: getField(primaryBtnObj, 'link', 'url') || baseSection.primaryButton.link,
    },
    secondaryButton: {
      text: getField(secondaryBtnObj, 'title', 'text') || baseSection.secondaryButton.text,
      link: getField(secondaryBtnObj, 'link', 'url') || baseSection.secondaryButton.link,
    },
    image: getField(imageTitleObj, 'image', 'url') || baseSection.image,
    imageTitle: getField(imageTitleObj, 'title', 'text') || baseSection.imageTitle,
    security: {
      title: getField(securityObj, 'title', 'name') || baseSection.security.title,
      content: getField(securityObj, 'content', 'description') || baseSection.security.content,
    },
    floatingCard1: {
      title: getField(floatCard1Obj, 'title', 'name') || baseSection.floatingCard1.title,
      content: getField(floatCard1Obj, 'content', 'description') || baseSection.floatingCard1.content,
      icon: getField(floatCard1Obj, 'icon', 'iconClass') || baseSection.floatingCard1.icon,
    },
    floatingCard2: {
      title: getField(floatCard2Obj, 'title', 'name') || baseSection.floatingCard2.title,
      content: getField(floatCard2Obj, 'content', 'description') || baseSection.floatingCard2.content,
      icon: getField(floatCard2Obj, 'icon', 'iconClass') || baseSection.floatingCard2.icon,
    },
    attributes: atributObjs.length > 0
      ? atributObjs.map(attr => ({
          value: getField(attr, 'title', 'value'),
          label: getField(attr, 'content', 'label'),
        }))
      : baseSection.attributes,
  };
};

// Watch for pageData changes
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
.hero-shell {
  min-height: auto;
  background: transparent;
}

.hero-panel {
  border-color: rgba(187, 213, 218, 0.4);
}

.hero-title {
  font-family: 'Outfit', 'Manrope', sans-serif;
  letter-spacing: -0.03em;
}

.animate-bounce-slow {
  animation: bounceSlow 5s infinite ease-in-out;
}

@keyframes bounceSlow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}
</style>
