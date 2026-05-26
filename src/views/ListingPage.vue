<template>
  <main class="page-shell">
    <!-- Header -->
    <div class="page-hero">
      <div class="section-container">
        <h1 class="page-hero-title">Katalog Perawatan Kecantikan</h1>
        <p class="page-hero-subtitle">Eksplorasi pilihan perawatan wajah, kulit, dan tubuh terbaik untuk menjaga kecantikan alami Anda</p>
      </div>
    </div>

    <div class="section-container">
      <!-- Filters -->
      <div class="page-panel -mt-8 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <!-- Search -->
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari layanan perawatan..."
            class="surface-input"
          />
          
          <!-- Category Filter -->
          <select
            v-model="selectedCategory"
            class="surface-select"
          >
            <option :value="null">Semua Kategori</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
          
          <!-- Sort -->
          <select
            v-model="sortBy"
            class="surface-select"
          >
            <option value="newest">Terbaru</option>
            <option value="impact-high">Rekomendasi Utama</option>
            <option value="duration-fast">Perawatan Singkat</option>
          </select>
          
          <!-- Reset -->
          <button
            @click="resetFilters"
            class="btn-secondary"
          >
            <i class="fas fa-redo"></i>
            Reset Filter
          </button>
        </div>
      </div>

      <!-- Results Count -->
      <div class="mb-6 text-slate-600">
        Menampilkan {{ paginatedListings.length }} dari {{ filteredListings.length }} layanan kecantikan
      </div>

      <!-- Listings Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <div
          v-for="listing in paginatedListings"
          :key="listing.post_id"
          class="card overflow-hidden group cursor-pointer"
          @click="$router.push(`/listing/${listing.post_id}`)"
        >
          <div class="relative overflow-hidden h-64">
            <img
              :src="listing.post?.thumbnail_url || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&q=80'"
              :alt="listing.post?.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div class="absolute top-4 right-4 chip-price">
              {{ formatPrice(listing.price) }}
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-slate-900 mb-2 line-clamp-2">
              {{ listing.post?.title }}
            </h3>
            <p class="text-slate-600 text-sm mb-4 line-clamp-2">
              {{ listing.post?.excerpt }}
            </p>
            <div class="flex items-center text-sm text-slate-500">
              <i class="fas fa-map-marker-alt mr-2"></i>
              Cabang: {{ listing.kabupaten }}, {{ listing.provinsi }}
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center gap-2">
        <button
          v-for="page in totalPages"
          :key="page"
          @click="currentPage = page"
          :class="[
            'page-pagination-btn',
            currentPage === page
              ? 'page-pagination-btn-active'
              : ''
          ]"
        >
          {{ page }}
        </button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import API_ENDPOINTS from '@/config/api';

const listings = ref([]);
const categories = ref([]);
const searchQuery = ref('');
const selectedCategory = ref(null);
const sortBy = ref('newest');
const currentPage = ref(1);
const itemsPerPage = 9;

const LISTING_TYPE = window.LISTING_TYPE || 1;
const LISTING_DISPLAY_IN = window.LISTING_DISPLAY_IN || 8;

const getValueByTags = (listing, tags) => {
  const values = listing?.values || [];
  const row = values.find(item => tags.includes((item?.tag_name || '').toLowerCase()));
  return row?.value ?? '';
};

const toNumber = (raw) => {
  if (raw === null || raw === undefined) return 0;
  if (typeof raw === 'number') return Number.isFinite(raw) ? raw : 0;
  const normalized = String(raw).replace(',', '.');
  const match = normalized.match(/-?\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : 0;
};

const getImpactScore = (listing) => {
  const fromTags = getValueByTags(listing, [
    'impact',
    'dampak',
    'impact_score',
    'dampak_utama',
    'hasil',
  ]);
  const fromPrice = toNumber(listing?.price);
  return toNumber(fromTags) || fromPrice || 0;
};

const getDurationInDays = (listing) => {
  const durationRaw = getValueByTags(listing, [
    'durasi',
    'duration',
    'project_duration',
    'lama_proyek',
  ]);
  if (!durationRaw) return Number.MAX_SAFE_INTEGER;

  const value = toNumber(durationRaw);
  const text = String(durationRaw).toLowerCase();
  if (!value) return Number.MAX_SAFE_INTEGER;
  if (text.includes('tahun')) return value * 365;
  if (text.includes('minggu')) return value * 7;
  if (text.includes('hari')) return value;
  return value * 30;
};

const getListingTimestamp = (listing) => {
  const dateRaw =
    listing?.created_at ||
    listing?.post?.created_at ||
    listing?.updated_at ||
    listing?.post?.updated_at;
  const ts = new Date(dateRaw || 0).getTime();
  return Number.isFinite(ts) ? ts : 0;
};

const filteredListings = computed(() => {
  let result = [...listings.value];

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(listing =>
      listing.post?.title?.toLowerCase().includes(query) ||
      listing.post?.excerpt?.toLowerCase().includes(query) ||
      listing.kabupaten?.toLowerCase().includes(query) ||
      listing.provinsi?.toLowerCase().includes(query)
    );
  }

  // Filter by category
  if (selectedCategory.value) {
    result = result.filter(listing =>
      listing.post?.categories?.some(cat => cat.id === selectedCategory.value)
    );
  }

  // Sort
  if (sortBy.value === 'impact-high') {
    result.sort((a, b) => getImpactScore(b) - getImpactScore(a));
  } else if (sortBy.value === 'duration-fast') {
    result.sort((a, b) => getDurationInDays(a) - getDurationInDays(b));
  } else {
    result.sort((a, b) => getListingTimestamp(b) - getListingTimestamp(a));
  }

  return result;
});

const totalPages = computed(() => Math.ceil(filteredListings.value.length / itemsPerPage));

const paginatedListings = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredListings.value.slice(start, end);
});

const formatPrice = (price) => {
  if (!price) return 'Konsultasikan';
  const num = parseFloat(price);
  if (isNaN(num)) return price;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(num);
};

const resetFilters = () => {
  searchQuery.value = '';
  selectedCategory.value = null;
  sortBy.value = 'newest';
  currentPage.value = 1;
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
    
    categories.value = Object.values(categoriesMap);
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

onMounted(() => {
  fetchCategories();
  fetchListings();
});
</script>
