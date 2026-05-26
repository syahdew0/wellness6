<template>
  <main class="page-shell">
    <!-- Header -->
    <div class="page-hero">
      <div class="section-container">
        <h1 class="page-hero-title">Blog & Artikel</h1>
        <p class="page-hero-subtitle">Informasi dan tips menarik seputar kecantikan, perawatan kulit, dan kesehatan alami</p>
      </div>
    </div>

    <div class="page-section">
      <!-- Blog Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="post in posts"
          :key="post.id"
          class="card overflow-hidden group cursor-pointer"
          @click="viewPost(post)"
        >
          <div class="relative overflow-hidden h-48">
            <img
              :src="post.thumbnail_url || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80'"
              :alt="post.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div class="p-6">
            <div class="flex items-center gap-2 text-sm text-slate-500 mb-3">
              <i class="fas fa-calendar"></i>
              <span>{{ formatDate(post.created_at) }}</span>
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-2 line-clamp-2">
              {{ post.title }}
            </h3>
            <p class="text-slate-600 text-sm line-clamp-3">
              {{ post.excerpt }}
            </p>
            <div class="mt-4 text-primary font-semibold">
              Baca Selengkapnya <i class="fas fa-arrow-right ml-1"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="posts.length === 0" class="text-center py-20">
        <i class="fas fa-newspaper text-6xl text-slate-300 mb-4"></i>
        <h3 class="text-2xl font-bold text-slate-900 mb-2">Belum Ada Artikel</h3>
        <p class="text-slate-600">Artikel akan segera hadir. Nantikan update terbaru dari kami!</p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import API_ENDPOINTS from '@/config/api';

const posts = ref([]);

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const viewPost = (post) => {
  // Navigate to post detail (you can implement this later)
  console.log('View post:', post);
  alert(`Post detail page coming soon!\n\nTitle: ${post.title}`);
};

const fetchPosts = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.allPosts());
    posts.value = response?.data?.data || response?.data || [];
  } catch (error) {
    console.warn('Failed to fetch posts', error);
  }
};

onMounted(() => {
  fetchPosts();
});
</script>
