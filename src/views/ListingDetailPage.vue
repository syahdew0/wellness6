<template>
  <main class="page-shell pb-20 pt-20">

    <!-- ── Loading Skeleton ─────────────────────────────────── -->
    <div v-if="isLoading" class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="animate-pulse space-y-6">
        <div class="h-[480px] rounded-3xl bg-slate-200/80"></div>
        <div class="flex gap-3">
          <div v-for="i in 4" :key="i" class="h-20 w-24 flex-shrink-0 rounded-2xl bg-slate-200/80"></div>
        </div>
        <div class="grid gap-8 lg:grid-cols-3 mt-4">
          <div class="space-y-4 lg:col-span-2">
            <div class="h-6 w-32 rounded-full bg-slate-200/80"></div>
            <div class="h-10 w-3/4 rounded-xl bg-slate-200/80"></div>
            <div class="h-5 w-1/2 rounded-full bg-slate-200/80"></div>
            <div class="h-36 rounded-2xl bg-slate-200/80"></div>
          </div>
          <div class="h-56 rounded-3xl bg-slate-200/80"></div>
        </div>
      </div>
    </div>

    <!-- ── Main Content ──────────────────────────────────────── -->
    <template v-else-if="listing">

      <!-- Hero Gallery -->
      <div class="relative bg-gradient-to-br from-slate-900 via-[#1a0000] to-slate-900 overflow-hidden">
        <!-- Decorative orbs -->
        <div class="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-red-700/20 blur-3xl"></div>
        <div class="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#BBD5DA]/15 blur-3xl"></div>

        <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 relative z-10">

          <!-- Main Image -->
          <div class="relative overflow-hidden rounded-3xl shadow-2xl shadow-black/40 group">
            <img
              :src="mainImage"
              :alt="listing.post?.title"
              class="h-[420px] w-full object-cover lg:h-[520px] transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <!-- Gradient overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
            <!-- Top edge fade -->
            <div class="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/30 to-transparent"></div>

            <!-- Back button -->
            <router-link
              to="/listing"
              class="absolute left-5 top-5 inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-md border border-white/20 transition-all duration-300 hover:bg-white/25 hover:scale-105 hover:shadow-lg"
            >
              <i class="fas fa-arrow-left text-xs"></i>
              Kembali
            </router-link>

            <!-- Photo counter badge -->
            <div class="absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-2xl bg-black/40 px-4 py-2 text-sm font-medium text-white backdrop-blur-md border border-white/15">
              <i class="fas fa-images text-red-400"></i>
              {{ images.length }} Foto
            </div>
          </div>

          <!-- Thumbnail Strip -->
          <div v-if="images.length > 1" class="mt-4 flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            <button
              v-for="(img, idx) in images"
              :key="idx"
              type="button"
              @click="mainImage = img"
              class="h-20 w-24 flex-shrink-0 overflow-hidden rounded-2xl border-2 transition-all duration-300"
              :class="mainImage === img
                ? 'border-red-500 shadow-lg shadow-red-500/30 scale-105'
                : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/40 hover:scale-105'"
            >
              <img :src="img" :alt="`Thumbnail ${idx + 1}`" class="h-full w-full object-cover" />
            </button>
          </div>
        </div>
      </div>

      <!-- Detail Body -->
      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div class="grid gap-10 lg:grid-cols-3">

          <!-- ── Left Column ───────────────────────────────── -->
          <div class="lg:col-span-2 space-y-8">

            <!-- Title & Location -->
            <div class="space-y-4">
              <!-- Category badges -->
              <div class="flex flex-wrap gap-2">
                <span class="section-kicker">
                  {{ listing.listingType?.name || 'Layanan' }}
                </span>
                <span
                  v-for="cat in listing.post?.categories || []"
                  :key="cat.id"
                  class="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm"
                >
                  {{ cat.name }}
                </span>
              </div>

              <h1 class="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                {{ listing.post?.title }}
              </h1>

              <p class="flex items-center gap-2 text-base font-medium text-slate-500">
                <span class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                  <i class="fas fa-map-marker-alt text-xs text-red-600"></i>
                </span>
                {{ listing.kecamatan }}, {{ listing.kabupaten }}, {{ listing.provinsi }}
              </p>
            </div>

            <!-- Description Card -->
            <div class="page-panel">
              <div class="mb-5 flex items-center gap-3">
                <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-red-100">
                  <i class="fas fa-align-left text-sm text-red-600"></i>
                </span>
                <h2 class="text-xl font-bold text-slate-900">Deskripsi</h2>
              </div>
              <div
                class="prose prose-slate prose-p:leading-relaxed prose-headings:font-bold max-w-none text-slate-600"
                v-html="listing.post?.content || listing.post?.excerpt || 'Tidak ada deskripsi'"
              ></div>
            </div>

            <!-- Info Table Card -->
            <div v-if="listing.values?.length" class="page-panel">
              <div class="mb-5 flex items-center gap-3">
                <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-red-100">
                  <i class="fas fa-list-ul text-sm text-red-600"></i>
                </span>
                <h2 class="text-xl font-bold text-slate-900">Informasi</h2>
              </div>
              <div class="grid gap-x-8 gap-y-0 sm:grid-cols-2">
                <div
                  v-for="item in listing.values"
                  :key="item.tag_name"
                  class="flex items-center justify-between border-b border-slate-100 py-3 last:border-0"
                >
                  <span class="text-sm text-slate-500">{{ formatTagName(item.tag_name) }}</span>
                  <span class="ml-4 text-right text-sm font-semibold text-slate-900">{{ item.value || '—' }}</span>
                </div>
              </div>
            </div>

          </div>

          <!-- ── Right Column — Price Card ──────────────────── -->
          <div class="lg:col-span-1">
            <div class="sticky top-24 space-y-5">

              <!-- Price card -->
              <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FF0000] via-[#cc0000] to-[#8B0000] p-7 text-white shadow-2xl shadow-red-900/30">
                <!-- Decorative circles -->
                <div class="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10"></div>
                <div class="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-black/10"></div>

                <p class="relative mb-1 text-sm font-medium text-red-200 uppercase tracking-widest">Biaya Perawatan</p>
                <p class="relative text-4xl font-extrabold leading-tight sm:text-5xl">
                  {{ formatPrice(listing.price) }}
                </p>

                <div class="relative mt-6 border-t border-white/20 pt-5">
                  <router-link
                    to="/listing"
                    class="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white/15 px-5 py-3 text-sm font-semibold text-white backdrop-blur border border-white/25 transition-all duration-300 hover:bg-white/30 hover:scale-[1.02] hover:shadow-lg"
                  >
                    <i class="fas fa-arrow-left text-xs"></i>
                    Kembali ke Katalog
                  </router-link>
                </div>
              </div>

              <!-- Share / floating info hint -->
              <div class="glass-panel p-5 text-center">
                <i class="fas fa-shield-alt text-2xl text-red-500 mb-2"></i>
                <p class="text-xs text-slate-500 leading-relaxed">
                  Informasi layanan telah diverifikasi oleh tim kami.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

    </template>

    <!-- ── Empty State ───────────────────────────────────────── -->
    <div v-else class="mx-auto max-w-7xl px-4 py-32 text-center sm:px-6 lg:px-8">
      <div class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-50 shadow-lg shadow-red-100">
        <i class="fas fa-home text-4xl text-red-400"></i>
      </div>
      <h1 class="mb-3 text-2xl font-bold text-slate-900">Layanan Tidak Ditemukan</h1>
      <p class="mb-8 text-slate-500">Layanan kecantikan yang Anda cari tidak ditemukan atau sudah tidak tersedia.</p>
      <router-link to="/listing" class="btn-primary">
        <i class="fas fa-arrow-left"></i>
        Kembali ke Katalog
      </router-link>
    </div>

  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import API_ENDPOINTS from '@/config/api';

const route = useRoute();

const listing = ref(null);
const isLoading = ref(true);
const mainImage = ref('');

const normalizeGallery = (raw) => {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return raw.filter(Boolean).map(item => (typeof item === 'string' ? item : item?.url || item?.src || '')).filter(Boolean);
  }
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return normalizeGallery(parsed);
    } catch (err) {
      // ignore and treat as single URL / comma-separated list
    }
    return raw
      .split(',')
      .map(v => v.trim())
      .filter(Boolean);
  }
  return [];
};

const images = computed(() => {
  const imgs = [];
  const thumb = listing.value?.post?.thumbnail_url;
  if (thumb) imgs.push(thumb);

  const gallery = normalizeGallery(
    listing.value?.post?.gallery || listing.value?.gallery || listing.value?.post?.images
  );

  gallery.forEach((img) => {
    if (img && !imgs.includes(img)) imgs.push(img);
  });

  return imgs.length
    ? imgs
    : ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80'];
});

const formatPrice = (price) => {
  if (!price) return 'Hubungi Kami';
  const num = parseFloat(price);
  if (isNaN(num)) return price;
  if (num >= 1000000000) return `Rp ${(num / 1000000000).toFixed(1)} Miliar`;
  if (num >= 1000000) return `Rp ${(num / 1000000).toFixed(0)} Juta`;
  return `Rp ${num.toLocaleString('id-ID')}`;
};

const formatTagName = (tagName) => {
  return String(tagName || '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
};

const fetchListing = async () => {
  isLoading.value = true;
  try {
    const id = route.params.id;
    const response = await axios.get(API_ENDPOINTS.listingDetail(id));
    listing.value = response?.data?.data || response?.data || null;
    mainImage.value = images.value[0];
  } catch (error) {
    console.error('Failed to fetch listing', error);
    listing.value = null;
    mainImage.value = '';
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchListing();
});
</script>
