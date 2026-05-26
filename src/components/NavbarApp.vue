<template>
  <nav class="navbar-shell relative sticky top-0 z-50 border-b backdrop-blur-md">
    <div class="navbar-glow pointer-events-none absolute inset-0"></div>
    <div class="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
      <div class="navbar-inner flex h-16 items-center justify-between rounded-full border px-4 sm:px-6">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2">
          <img
            v-if="showLogo"
            :src="logo"
            alt="Logo"
            class="h-10 w-auto"
            @error="logoError = true"
          />
          <span class="text-2xl font-bold text-teal-700" :class="{ 'text-xl': showLogo }">
            {{ siteTitle }}
          </span>
        </router-link>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center gap-2">
          <router-link
            v-for="(item, index) in menus"
            :key="item.id"
            :to="getMenuTo(item)"
            :target="item.target"
            :class="[
              'nav-link rounded-full px-4 py-2 font-semibold',
              index === menus.length - 1
                ? 'nav-link-cta'
                : 'nav-link-default'
            ]"
          >
            {{ item.title }}
          </router-link>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="mobile-menu-btn rounded-lg p-2 md:hidden"
        >
          <i :class="mobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'" class="text-xl"></i>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="mobileMenuOpen"
      class="mobile-panel border-t md:hidden"
    >
      <div class="px-4 py-3 space-y-3">
        <router-link
          v-for="item in menus"
          :key="item.id"
          :to="getMenuTo(item)"
          :target="item.target"
          @click="mobileMenuOpen = false"
          class="mobile-link block rounded-lg px-2 py-2 font-medium"
        >
          {{ item.title }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import API_ENDPOINTS, { API_URL } from '@/config/api';

/* global defineProps */
const props = defineProps({
  settings: { type: Object, default: () => ({}) },
  menuItems: { type: Array, default: () => [] },
});

const logo = ref('');
const logoError = ref(false);
const menus = ref([]);
const mobileMenuOpen = ref(false);

const siteTitle = computed(() => {
  return (
    props.settings?.site_title ||
    props.settings?.siteTitle ||
    props.settings?.title ||
    'Company Profile'
  );
});
const showLogo = computed(() => Boolean(logo.value) && !logoError.value);

const defaultMenuItems = [
  { id: 1, title: 'Home', path: '/', target: '_self', parent_id: null },
  { id: 2, title: 'Listing', path: '/listing', target: '_self', parent_id: null },
  { id: 3, title: 'About', path: '#about', target: '_self', parent_id: null },
  { id: 4, title: 'Contact', path: '/contact', target: '_self', parent_id: null },
  { id: 5, title: 'Help', path: '/help', target: '_self', parent_id: null },
];

const getMenuTo = (item) => {
  const rawPath = item?.path || '/';
  if (typeof rawPath === 'string' && rawPath.startsWith('#')) {
    return { path: '/', hash: rawPath };
  }
  return rawPath;
};

// Helper to join URL paths
const joinUrl = (base, path) => {
  if (!path) return base;
  const cleanBase = base.replace(/\/$/, '');
  const cleanPath = path.replace(/^\//, '');
  return `${cleanBase}/${cleanPath}`;
};

const fetchLogo = async () => {
  try {
    const res = await axios.get(API_ENDPOINTS.settingLogo);
    const raw = res?.data?.data || res?.data || {};
    const candidate = raw.logo || raw.icon || raw.value;
    logoError.value = false;
    if (candidate) {
      logo.value = /^https?:\/\//i.test(candidate) ? candidate : joinUrl(API_URL, candidate);
    } else {
      logo.value = '';
    }
  } catch (error) {
    console.warn('Failed to fetch logo, using settings', error);
    logoError.value = false;
    logo.value = props.settings?.logo || '';
  }
};

const fetchMenu = async () => {
  try {
    const menuGroup = window.MENU_GROUP_SLUG || 'main';
    const response = await axios.get(API_ENDPOINTS.menuListByGroup(menuGroup));
    const items = response?.data?.data || response?.data || [];
    
    if (items.length > 0) {
      menus.value = [...items]
        .sort((a, b) => {
          const orderA = Number.isFinite(Number(a?.order)) ? Number(a.order) : Number.MAX_SAFE_INTEGER;
          const orderB = Number.isFinite(Number(b?.order)) ? Number(b.order) : Number.MAX_SAFE_INTEGER;

          if (orderA !== orderB) return orderA - orderB;

          const idA = Number.isFinite(Number(a?.id)) ? Number(a.id) : Number.MAX_SAFE_INTEGER;
          const idB = Number.isFinite(Number(b?.id)) ? Number(b.id) : Number.MAX_SAFE_INTEGER;
          return idA - idB;
        })
        .map(item => ({
          id: item.id,
          title: item.title || item.label || item.name || 'Tanpa Judul',
          path: item.path || item.url || item.link || '/',
          target: item.target || (item.open_in_new_tab ? '_blank' : '_self'),
          parent_id: item.parent_id || null,
          order: item.order,
        }));
    } else {
      menus.value = defaultMenuItems;
    }
  } catch (error) {
    console.warn('Failed to fetch menu, using defaults', error);
    menus.value = defaultMenuItems;
  }
};

onMounted(() => {
  fetchLogo();
  fetchMenu();
});
</script>

<style scoped>
.navbar-shell {
  position: sticky;
  border-color: rgba(187, 213, 218, 0.3);
  background: rgba(255, 255, 255, 0.86);
}

.navbar-glow {
  background:
    radial-gradient(circle at 14% 0%, rgba(255, 0, 0, 0.04), transparent 34%),
    radial-gradient(circle at 90% 100%, rgba(187, 213, 218, 0.15), transparent 30%);
}

.navbar-inner {
  position: relative;
  border-color: rgba(187, 213, 218, 0.4);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(223, 241, 241, 0.5));
  box-shadow: 0 12px 30px -20px rgba(255, 0, 0, 0.15);
}

.nav-link {
  transition: all 0.25s ease;
}

.nav-link-default {
  color: rgb(51, 65, 85);
}

.nav-link-default:hover {
  color: #FF0000;
  background: rgba(223, 241, 241, 0.4);
}

.nav-link-cta {
  color: #fff;
  background: linear-gradient(90deg, #FF0000, #FF4D4D);
  box-shadow: 0 12px 20px -15px rgba(255, 0, 0, 0.4);
}

.nav-link-cta:hover {
  filter: brightness(1.04);
}

.mobile-menu-btn {
  color: #0f172a;
  transition: all 0.2s ease;
}

.mobile-menu-btn:hover {
  color: #FF0000;
  background: rgba(223, 241, 241, 0.4);
}

.mobile-panel {
  border-color: rgba(187, 213, 218, 0.3);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(223, 241, 241, 0.8));
}

.mobile-link {
  color: rgb(51, 65, 85);
  transition: all 0.2s ease;
}

.mobile-link:hover {
  color: #FF0000;
  background: rgba(223, 241, 241, 0.4);
}
</style>
