<template>
  <main class="page-shell pb-16 pt-20">
    <div v-if="isLoading" class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="animate-pulse space-y-8">
        <div class="h-96 rounded-2xl bg-slate-200"></div>
        <div class="grid gap-8 lg:grid-cols-3">
          <div class="space-y-4 lg:col-span-2">
            <div class="h-8 w-2/3 rounded bg-slate-200"></div>
            <div class="h-4 w-1/2 rounded bg-slate-200"></div>
            <div class="h-32 rounded bg-slate-200"></div>
          </div>
          <div class="h-64 rounded-2xl bg-slate-200"></div>
        </div>
      </div>
    </div>

    <template v-else-if="listing">
      <div class="bg-gradient-to-r from-primary via-primary/95 to-slate-800">
        <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div class="relative overflow-hidden rounded-2xl">
            <img
              :src="mainImage"
              :alt="listing.post?.title"
              class="h-[400px] w-full object-cover lg:h-[500px]"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

            <router-link
              to="/listing"
              class="absolute left-6 top-6 inline-flex items-center gap-2 rounded-lg bg-white/15 px-4 py-2 text-white backdrop-blur transition-colors hover:bg-white/30"
            >
              <i class="fas fa-arrow-left"></i>
              Kembali
            </router-link>

            <div class="absolute bottom-6 right-6 rounded-lg bg-white/15 px-4 py-2 text-white backdrop-blur">
              <i class="fas fa-images mr-2"></i>
              {{ images.length }} Foto
            </div>
          </div>

          <div v-if="images.length > 1" class="mt-4 flex gap-3 overflow-x-auto pb-2">
            <button
              v-for="(img, idx) in images"
              :key="idx"
              type="button"
              @click="mainImage = img"
              class="h-20 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all"
              :class="mainImage === img ? 'border-secondary shadow-lg shadow-secondary/25' : 'border-transparent opacity-70 hover:opacity-100'"
            >
              <img :src="img" :alt="`Thumbnail ${idx + 1}`" class="h-full w-full object-cover" />
            </button>
          </div>
        </div>
      </div>

      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-4xl">
          <div class="space-y-8">
            <div>
              <div class="mb-4 flex flex-wrap gap-2">
                <span class="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-white">
                  {{ listing.listingType?.name || 'Layanan' }}
                </span>
                <span
                  v-for="cat in listing.post?.categories || []"
                  :key="cat.id"
                  class="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600"
                >
                  {{ cat.name }}
                </span>
              </div>

              <h1 class="mb-4 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
                {{ listing.post?.title }}
              </h1>

              <p class="flex items-center gap-2 text-lg text-slate-600">
                <i class="fas fa-map-marker-alt text-secondary"></i>
                {{ listing.kecamatan }}, {{ listing.kabupaten }}, {{ listing.provinsi }}
              </p>
            </div>

            <div class="rounded-2xl bg-gradient-to-r from-primary to-slate-800 p-6 text-white">
              <p class="mb-1 text-slate-200">Biaya Perawatan</p>
              <p class="text-3xl font-bold sm:text-4xl">{{ formatPrice(listing.price) }}</p>
            </div>

            <div class="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h2 class="mb-4 text-xl font-bold text-slate-900">Deskripsi</h2>
              <div
                class="prose prose-slate max-w-none"
                v-html="listing.post?.content || listing.post?.excerpt || 'Tidak ada deskripsi'"
              ></div>
            </div>

            <div v-if="listing.values?.length" class="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h2 class="mb-4 text-xl font-bold text-slate-900">Informasi</h2>
              <div class="grid gap-4 sm:grid-cols-2">
                <div
                  v-for="item in listing.values"
                  :key="item.tag_name"
                  class="flex justify-between border-b border-slate-100 py-3 last:border-0"
                >
                  <span class="text-slate-600">{{ formatTagName(item.tag_name) }}</span>
                  <span class="ml-4 text-right font-semibold text-slate-900">{{ item.value || '-' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <div v-else class="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <div class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-100">
        <i class="fas fa-home text-4xl text-slate-400"></i>
      </div>
      <h1 class="mb-4 text-2xl font-bold text-slate-900">Layanan Tidak Ditemukan</h1>
      <p class="mb-8 text-slate-600">Layanan kecantikan yang Anda cari tidak ditemukan atau sudah tidak tersedia.</p>
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
