<template>
  <main class="page-shell">
    <!-- Header -->
    <div class="page-hero">
      <div class="section-container">
        <h1 class="page-hero-title">Pusat Bantuan</h1>
        <p class="page-hero-subtitle">Temukan panduan dan jawaban seputar perawatan kecantikan dan layanan klinik kami</p>
      </div>
    </div>

    <div class="page-section">
      <!-- Search -->
      <div class="max-w-2xl mx-auto mb-12">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari bantuan..."
            class="surface-input rounded-full pl-14"
          />
          <i class="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"></i>
        </div>
      </div>

      <!-- FAQ Categories -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div
          v-for="category in categories"
          :key="category.id"
          class="card p-6 text-center hover:shadow-xl transition-all cursor-pointer"
          @click="selectedCategory = category.id"
        >
          <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <i :class="category.icon" class="text-3xl text-primary"></i>
          </div>
          <h3 class="text-lg font-bold text-slate-900 mb-2">{{ category.title }}</h3>
          <p class="text-sm text-slate-600">{{ category.count }} artikel</p>
        </div>
      </div>

      <!-- FAQ List -->
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold text-slate-900 mb-8">Pertanyaan Umum</h2>
        <div class="space-y-4">
          <div
            v-for="(faq, index) in filteredFaqs"
            :key="index"
            class="card overflow-hidden"
          >
            <button
              @click="toggleFaq(index)"
              class="w-full p-6 flex items-center justify-between text-left hover:bg-slate-50/80 transition-colors"
            >
              <h3 class="text-lg font-semibold text-slate-900 pr-4">
                {{ faq.question }}
              </h3>
              <i
                :class="[
                  'fas transition-transform duration-300',
                  openFaq === index ? 'fa-chevron-up' : 'fa-chevron-down'
                ]"
              ></i>
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

      <!-- Contact Support -->
      <div class="max-w-4xl mx-auto mt-12 card p-8 text-center">
        <h3 class="text-2xl font-bold text-slate-900 mb-4">Masih Butuh Bantuan?</h3>
        <p class="text-slate-600 mb-6">
          Tim kami siap membantu Anda memilih perawatan kecantikan dan menyusun jadwal konsultasi terbaik.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <a href="mailto:support@beautyclinic.com" class="btn-primary">
            <i class="fas fa-envelope"></i>
            Email Support
          </a>
          <router-link to="/contact" class="btn-secondary">
            <i class="fas fa-phone"></i>
            Hubungi Kami
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue';

const searchQuery = ref('');
const selectedCategory = ref(null);
const openFaq = ref(0);

const categories = ref([
  { id: 1, title: 'Perawatan Wajah', icon: 'fas fa-spa', count: 8 },
  { id: 2, title: 'Konsultasi Dokter', icon: 'fas fa-user-doctor', count: 6 },
  { id: 3, title: 'Reservasi', icon: 'fas fa-calendar-check', count: 5 },
  { id: 4, title: 'Keamanan Produk', icon: 'fas fa-shield-halved', count: 10 },
  { id: 5, title: 'Biaya & Promo', icon: 'fas fa-tags', count: 7 },
  { id: 6, title: 'Lainnya', icon: 'fas fa-question-circle', count: 4 },
]);

const faqs = ref([
  {
    category: 1,
    question: 'Perawatan apa yang cocok untuk jenis kulit saya?',
    answer: 'Tim dokter dan terapis profesional kami akan menganalisis jenis kulit Anda terlebih dahulu sebelum menyarankan paket treatment kecantikan yang tepat.'
  },
  {
    category: 1,
    question: 'Apakah facial di klinik menimbulkan kemerahan?',
    answer: 'Kemerahan ringan adalah hal biasa setelah ekstraksi, namun tim kami menggunakan teknologi penenang kulit modern untuk meminimalkan kemerahan tersebut dalam waktu singkat.'
  },
  {
    category: 2,
    question: 'Bagaimana cara berkonsultasi dengan dokter kecantikan?',
    answer: 'Anda bisa berkonsultasi secara langsung dengan datang ke klinik, atau melakukan reservasi jadwal konsultasi online terlebih dahulu melalui WhatsApp.'
  },
  {
    category: 3,
    question: 'Apakah harus reservasi sebelum datang treatment?',
    answer: 'Sangat disarankan melakukan reservasi agar Anda mendapatkan jadwal konsultasi dan treatment yang tepat tanpa harus mengantre lama.'
  },
  {
    category: 4,
    question: 'Apakah produk kosmetik dan skincare di sini aman?',
    answer: 'Tentu saja. Semua produk kami bersertifikasi BPOM, diuji secara klinis, dan diawasi langsung oleh tim dokter kulit berpengalaman.'
  },
  {
    category: 5,
    question: 'Apakah ada paket hemat atau promo khusus pelanggan baru?',
    answer: 'Kami menyediakan berbagai promo khusus, diskon membership, serta paket treatment hemat yang diupdate secara berkala.'
  }
]);

const filteredFaqs = computed(() => {
  let result = faqs.value;
  
  if (selectedCategory.value) {
    result = result.filter(faq => faq.category === selectedCategory.value);
  }
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(faq =>
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query)
    );
  }
  
  return result;
});

const toggleFaq = (index) => {
  openFaq.value = openFaq.value === index ? null : index;
};
</script>
