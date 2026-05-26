<template>
  <section class="section-container">
    <div class="about-shell relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-200/60 p-8 sm:p-12 md:p-16 shadow-xl shadow-slate-900/5">
      <!-- Decorative background blur blobs -->
      <div class="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-red-50 blur-3xl opacity-60"></div>
      <div class="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-cyan-50/50 blur-3xl opacity-60"></div>

      <div class="relative">
        <!-- Section Header -->
        <div class="mb-12">
          <span class="section-kicker">
            {{ sectionState.badge }}
          </span>
          <div class="about-divider mt-4 mb-6"></div>
        </div>

        <div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          <!-- Left Column: Content + Image + Stats -->
          <div class="lg:col-span-7 space-y-8">
            <h2 class="about-title text-3xl font-extrabold leading-[1.15] text-slate-900 sm:text-4xl md:text-5xl">
              {{ sectionState.title }}
            </h2>
            
            <p class="text-base leading-relaxed text-slate-600 sm:text-lg">
              {{ sectionState.content }}
            </p>

            <!-- Image with glass floating credential -->
            <div class="about-image-wrap relative overflow-hidden rounded-[2rem] border border-slate-200/50 shadow-lg shadow-slate-900/5">
              <img
                :src="sectionState.image"
                :alt="sectionState.title"
                class="h-[360px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[420px]"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent"></div>
              
              <!-- Floating Core Value Glass Card -->
              <div class="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/60 bg-white/75 px-5 py-4 backdrop-blur-md shadow-md flex items-center gap-4">
                <div class="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-red-500 text-white shadow-md shadow-red-500/20">
                  <i class="fas fa-gem text-base"></i>
                </div>
                <div class="text-left">
                  <p class="text-[10px] uppercase tracking-widest text-red-600 font-bold">{{ sectionState.coreValueLabel }}</p>
                  <p class="mt-0.5 text-sm font-extrabold text-slate-800">{{ sectionState.coreValues }}</p>
                </div>
              </div>
            </div>

            <!-- Stats Chips Row -->
            <div class="grid grid-cols-3 gap-3">
              <div
                v-for="(stat, index) in sectionState.stats"
                :key="'stat-' + index"
                class="about-stat-chip text-center rounded-2xl border border-red-500/10 bg-gradient-to-b from-white to-red-50/20 py-4 px-3 shadow-sm hover:shadow-md transition-shadow"
              >
                <p class="about-stat-val text-2xl font-black text-red-600 sm:text-3xl">{{ stat.value }}</p>
                <p class="mt-1 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{{ stat.label }}</p>
              </div>
            </div>
          </div>

          <!-- Right Column: Premium Feature Cards -->
          <div class="lg:col-span-5 flex flex-col gap-4 pt-2 lg:pt-14 relative z-10">
            <div
              v-for="(attr, index) in sectionState.attributes"
              :key="index"
              class="about-feature-card flex items-start gap-4 rounded-2xl border border-slate-200/50 bg-white p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600 shadow-inner">
                <i class="fas fa-check-circle text-lg"></i>
              </div>
              <div class="text-left">
                <h4 class="font-extrabold text-slate-900 text-base sm:text-lg">{{ attr.title }}</h4>
                <p class="mt-1.5 text-sm leading-relaxed text-slate-500">{{ attr.content }}</p>
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
  badge: 'Tentang Klinik',
  title: 'Perawatan Kecantikan Modern untuk Kulit Sehat dan Bersinar',
  content:
    'Kami adalah klinik kecantikan profesional yang menghadirkan layanan perawatan wajah dan tubuh dengan teknologi modern serta tenaga ahli berpengalaman. Fokus kami adalah membantu setiap pelanggan mendapatkan kulit sehat, tampilan lebih segar, dan rasa percaya diri yang optimal.',
  image:
    'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1800&q=80',
  coreValueLabel: 'Core Value',
  coreValues: 'Cantik, Sehat, Alami',
  stats: [
    { value: '8+', label: 'Tahun Pengalaman' },
    { value: '5.000+', label: 'Klien Puas' },
    { value: '99%', label: 'Tingkat Kepuasan' },
  ],
  attributes: [
    {
      title: 'Perawatan Profesional',
      content: 'Ditangani oleh dokter dan terapis berpengalaman',
    },
    {
      title: 'Teknologi Modern',
      content: 'Menggunakan alat dan metode kecantikan terkini',
    },
    {
      title: 'Produk Aman',
      content: 'Memakai produk berkualitas dan teruji klinis',
    },
    {
      title: 'Hasil Optimal',
      content: 'Fokus pada perawatan yang aman dan efektif',
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

  const badgeObj = getItemByTag('about_badge28', source)[0] || {};
  const mainObj = getItemByTag('about_main28', source)[0] || {};
  const coreValueObj = getItemByTag('about_core_value_card28', source)[0] || {};
  const statObjs = getItemByTag('about_stat28', source);
  const atributObjs = getItemByTag('about_atribut28', source);

  sectionState.value = {
    badge: getField(badgeObj, 'title', 'content') || baseSection.badge,
    title: getField(mainObj, 'title', 'heading') || baseSection.title,
    content: getField(mainObj, 'content', 'subtitle') || baseSection.content,
    image: getField(mainObj, 'image', 'url') || baseSection.image,
    coreValueLabel: getField(coreValueObj, 'title', 'name') || baseSection.coreValueLabel,
    coreValues: getField(coreValueObj, 'content', 'description') || baseSection.coreValues,
    stats: statObjs.length > 0
      ? statObjs.map(stat => ({
          value: getField(stat, 'title', 'value'),
          label: getField(stat, 'content', 'label'),
        }))
      : baseSection.stats,
    attributes: atributObjs.length > 0
      ? atributObjs.map(attr => ({
          title: getField(attr, 'title', 'name'),
          content: getField(attr, 'content', 'description'),
        }))
      : baseSection.attributes,
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
.about-shell {
  border-color: rgba(187, 213, 218, 0.4);
}

.about-divider {
  width: 40px;
  height: 2px;
  background: #FF0000;
  border-radius: 2px;
}

.about-title {
  font-family: 'Outfit', 'Manrope', sans-serif;
  letter-spacing: -0.02em;
}

.about-image-wrap {
  border-color: rgba(187, 213, 218, 0.3);
}

.about-stat-chip {
  border-color: rgba(255, 0, 0, 0.1);
  background: linear-gradient(180deg, #ffffff 0%, rgba(223, 241, 241, 0.25) 100%);
}

.about-stat-val {
  font-family: 'Outfit', 'Manrope', sans-serif;
}
</style>