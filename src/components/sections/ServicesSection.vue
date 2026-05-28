<template>
  <section class="relative py-20 overflow-hidden bg-[#F5F5F5]">
    <!-- Elegant clinical background decorative elements -->
    <div class="absolute left-1/4 top-0 -z-10 h-72 w-72 rounded-full bg-red-500/5 blur-[120px]"></div>
    <div class="absolute right-1/4 bottom-0 -z-10 h-96 w-96 rounded-full bg-cyan-500/5 blur-[150px]"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-red-600 bg-red-50 border border-red-200/50 mb-4 uppercase">
          <i class="fas fa-sparkles text-[10px]"></i>
          {{ sectionState.badge }}
        </span>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4 leading-tight">
          {{ sectionState.title }}
        </h2>
        <div class="h-1 w-20 bg-gradient-to-r from-red-600 to-red-400 mx-auto rounded-full mb-6"></div>
        <p class="text-lg text-slate-600 font-medium leading-relaxed">
          {{ sectionState.subtitle }}
        </p>
      </div>

      <!-- Services Grid -->
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(service, index) in sectionState.items"
          :key="index"
          class="service-card group relative overflow-hidden p-8 transition-all duration-300 hover:-translate-y-2"
        >
          <!-- Corner Index Number -->
          <div class="absolute right-6 top-6 text-4xl font-black text-slate-100 select-none group-hover:text-red-500/10 transition-colors duration-300">
            0{{ index + 1 }}
          </div>

          <div class="relative z-10">
            <!-- Icon Container with premium clinical gradient -->
            <div class="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-red-500 text-white shadow-lg shadow-red-600/20 transform transition-transform duration-500 group-hover:rotate-6">
              <i :class="service.icon || 'fas fa-home'" class="text-2xl"></i>
            </div>
            
            <h3 class="mb-3 text-xl font-bold text-slate-900 group-hover:text-red-600 transition-colors duration-300">
              {{ service.title }}
            </h3>
            
            <p class="text-slate-600 leading-relaxed text-sm">
              {{ service.content }}
            </p>
          </div>
          
          <!-- Bottom animated bar -->
          <div class="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-red-600 to-red-400 w-0 group-hover:w-full transition-all duration-500"></div>
        </article>
      </div>

      <!-- Bottom Interactive CTA Banner -->
      <div class="mt-16 service-cta-banner backdrop-blur-md rounded-3xl p-8 border border-[#BBD5DA]/40 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 transform hover:scale-[1.01] transition-all duration-300">
        <div class="flex items-center gap-5 text-left">
          <div class="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
            <i class="fas fa-user-md text-xl animate-pulse"></i>
          </div>
          <div>
            <h4 class="text-lg font-bold text-slate-900">{{ sectionState.cta.title }}</h4>
            <p class="text-slate-600 text-sm mt-1 max-w-xl leading-relaxed">{{ sectionState.cta.content }}</p>
          </div>
        </div>
        <!-- <a
          :href="sectionState.cta.buttonLink"
          target="_blank"
          class="shrink-0 inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold text-sm shadow-md shadow-red-600/10 hover:shadow-lg hover:shadow-red-600/20 transform hover:-translate-y-0.5 transition-all duration-300 gap-2"
        >
          <span>{{ sectionState.cta.buttonText }}</span>
          <i class="fas fa-arrow-right text-xs"></i>
        </a> -->

        <router-link :to="sectionState.cta.buttonLink" class="shrink-0 inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold text-sm shadow-md shadow-red-600/10 hover:shadow-lg hover:shadow-red-600/20 transform hover:-translate-y-0.5 transition-all duration-300 gap-2">
          {{ sectionState.cta.buttonText }}
          <i class="fas fa-arrow-right text-xs"></i>
        </router-link>
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
  badge: 'Layanan Kami',
  title: 'Perawatan Kecantikan Profesional',
  subtitle:
    'Berbagai treatment modern kami hadir untuk membantu Anda mendapatkan kulit sehat, cerah, dan tampilan yang lebih percaya diri',
  items: [
    {
      icon: 'fas fa-spa',
      title: 'Facial Treatment',
      content:
        'Perawatan wajah untuk membersihkan, menutrisi, dan menjaga kesehatan kulit secara menyeluruh',
    },
    {
      icon: 'fas fa-sun',
      title: 'Brightening Treatment',
      content:
        'Membantu mencerahkan kulit kusam dan membuat wajah tampak lebih segar dan bercahaya',
    },
    {
      icon: 'fas fa-heart',
      title: 'Acne Care',
      content:
        'Perawatan khusus untuk membantu mengatasi jerawat, bekas jerawat, dan minyak berlebih',
    },
    {
      icon: 'fas fa-wand-magic-sparkles',
      title: 'Laser Treatment',
      content:
        'Teknologi laser modern untuk membantu meremajakan kulit dan mengatasi berbagai masalah kulit',
    },
    {
      icon: 'fas fa-user-doctor',
      title: 'Konsultasi Dokter',
      content:
        'Konsultasi langsung dengan dokter kecantikan profesional sesuai kebutuhan kulit Anda',
    },
    {
      icon: 'fas fa-hand-holding-heart',
      title: 'Perawatan Berkelanjutan',
      content:
        'Pendampingan dan rekomendasi treatment rutin untuk menjaga hasil perawatan tetap optimal',
    },
  ],
  cta: {
    title: 'Konsultasi Kulit Gratis',
    content: 'Hubungi tim dokter spesialis kami untuk analisis kulit menyeluruh dan rekomendasi treatment yang tepat.',
    buttonText: 'Mulai Konsultasi',
    buttonLink: '/contact'
  }
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

  const badgeObj = getItemByTag('service_badge28', source)[0] || {};
  const mainObj = getItemByTag('service_main28', source)[0] || {};
  const itemObjs = getItemByTag('service_item28', source);
  const ctaObj = getItemByTag('service_cta28', source)[0] || {};

  sectionState.value = {
    badge: getField(badgeObj, 'title', 'content') || baseSection.badge,
    title: getField(mainObj, 'title', 'heading') || baseSection.title,
    subtitle: getField(mainObj, 'content', 'subtitle') || baseSection.subtitle,
    items: itemObjs.length > 0
      ? itemObjs.map(item => ({
          icon: getField(item, 'icon', 'iconClass'),
          title: getField(item, 'title', 'name'),
          content: getField(item, 'content', 'description'),
        }))
      : baseSection.items,
    cta: {
      title: getField(ctaObj, 'title', 'name') || baseSection.cta.title,
      content: getField(ctaObj, 'content', 'description') || baseSection.cta.content,
      buttonText: getField(ctaObj, 'buttonText', 'text') || baseSection.cta.buttonText,
      buttonLink: getField(ctaObj, 'buttonLink', 'url') || baseSection.cta.buttonLink,
    }
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
.service-card {
  border: 1px solid rgba(187, 213, 218, 0.4);
  border-radius: 1.5rem;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.98), rgba(223, 241, 241, 0.35)),
    linear-gradient(180deg, rgba(255, 0, 0, 0.015), rgba(255, 255, 255, 0));
  box-shadow: 0 4px 20px -2px rgba(187, 213, 218, 0.15);
}

.service-card:hover {
  border-color: rgba(255, 0, 0, 0.25);
  box-shadow: 
    0 20px 40px -15px rgba(255, 0, 0, 0.06),
    0 0 0 1px rgba(255, 0, 0, 0.05);
}

.service-cta-banner {
  background:
    linear-gradient(135deg, rgba(223, 241, 241, 0.9), rgba(255, 255, 255, 0.85)),
    linear-gradient(180deg, rgba(255, 255, 255, 0.5), rgba(187, 213, 218, 0.1));
  box-shadow: 
    0 10px 30px -10px rgba(187, 213, 218, 0.3),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.6);
}
</style>
