<template>
  <section class="section-container">
    <div class="grid grid-cols-1 gap-12 lg:grid-cols-[0.88fr_1.12fr]">
      <div class="lg:sticky lg:top-28 lg:h-fit">
        <span class="section-kicker">{{ sectionState.badge }}</span>
        <h2 class="section-title text-left">{{ sectionState.title }}</h2>
        <p class="mt-4 max-w-md text-slate-700">
          Temukan jawaban cepat untuk pertanyaan paling umum sebelum memulai kerja sama.
        </p>
      </div>

      <div class="space-y-4">
        <div
          v-for="(faq, index) in sectionState.items"
          :key="index"
          class="faq-item overflow-hidden"
        >
          <button
            @click="toggleFaq(index)"
            class="faq-item-trigger flex w-full items-center justify-between gap-4 p-6 text-left"
          >
            <h3 class="pr-4 text-lg font-semibold text-slate-900">
              {{ faq.question }}
            </h3>
            <span
              class="flex h-9 w-9 items-center justify-center rounded-full border"
              :class="openFaq === index ? 'faq-icon-open' : 'faq-icon-closed'"
            >
              <i
                :class="[
                  'fas text-xs transition-transform duration-300',
                  openFaq === index ? 'fa-chevron-up' : 'fa-chevron-down'
                ]"
              ></i>
            </span>
          </button>
          <div
            v-show="openFaq === index"
            class="px-6 pb-6 text-slate-600"
          >
            {{ faq.answer }}
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
  badge: 'FAQ',
  title: 'Pertanyaan yang Sering Diajukan',
  items: [
    {
      question: 'Perawatan apa yang cocok untuk jenis kulit saya?',
      answer:
        'Tim dokter dan beauty therapist kami akan melakukan konsultasi terlebih dahulu untuk menentukan treatment yang paling sesuai dengan kondisi kulit Anda.',
    },
    {
      question: 'Apakah treatment di klinik aman?',
      answer:
        'Ya. Semua perawatan dilakukan oleh tenaga profesional menggunakan produk dan teknologi yang telah teruji serta aman digunakan.',
    },
    {
      question: 'Berapa lama hasil treatment mulai terlihat?',
      answer:
        'Hasil perawatan berbeda pada setiap orang, namun sebagian besar treatment menunjukkan perubahan positif setelah beberapa sesi.',
    },
    {
      question: 'Apakah ada efek samping setelah treatment?',
      answer:
        'Beberapa treatment mungkin menimbulkan kemerahan ringan sementara, namun biasanya akan hilang dalam waktu singkat sesuai prosedur perawatan.',
    },
    {
      question: 'Bagaimana cara melakukan reservasi treatment?',
      answer:
        'Anda dapat menghubungi kami melalui form kontak, WhatsApp, atau datang langsung ke klinik untuk melakukan konsultasi dan reservasi jadwal.',
    },
  ],
};

const sectionState = ref({ ...baseSection });
const openFaq = ref(0);

const toggleFaq = (index) => {
  openFaq.value = openFaq.value === index ? null : index;
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

  const titleObj = getItemByTag('faq_title28', source)[0] || {};
  const itemObjs = getItemByTag('faq_item28', source);

  sectionState.value = {
    badge: getField(titleObj, 'title', 'badge') || baseSection.badge,
    title: getField(titleObj, 'content', 'heading') || baseSection.title,
    items: itemObjs.length > 0
      ? itemObjs.map(item => ({
          question: getField(item, 'title', 'question'),
          answer: getField(item, 'content', 'answer'),
        }))
      : baseSection.items,
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
.faq-item {
  border: 1px solid rgba(187, 213, 218, 0.4);
  border-radius: 1.25rem;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.96), rgba(223, 241, 241, 0.25));
}

.faq-item-trigger:hover {
  background: rgba(223, 241, 241, 0.2);
}

.faq-icon-open {
  border-color: rgba(255, 0, 0, 0.8);
  background: linear-gradient(145deg, #FF0000, #FF4D4D);
  color: #fff;
}

.faq-icon-closed {
  border-color: rgba(187, 213, 218, 0.5);
  color: rgb(100, 116, 139);
}
</style>
