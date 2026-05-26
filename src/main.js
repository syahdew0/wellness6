import './public-path';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import { API_ENDPOINTS } from './config/api';
import './assets/tailwind.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

async function initSiteInfo() {
  const cached = localStorage.getItem('siteInfo');
  if (cached) {
    try {
      const cachedData = JSON.parse(cached);
      document.title = cachedData.site_title || 'Property Template';
      
      // Update favicon if available
      if (cachedData.favicon) {
        const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = cachedData.favicon;
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      
      return cachedData;
    } catch (error) {
      console.warn('Failed to parse cached siteInfo', error);
    }
  }

  try {
    const resInfo = await axios.get(API_ENDPOINTS.siteInfo());
    const websiteId = resInfo?.data?.id || resInfo?.data?.website_id;
    const resSettings = await axios.get(API_ENDPOINTS.siteSettingsPublic(websiteId));
    const siteData = resSettings?.data?.settings || resSettings?.data?.data || {};
    
    document.title = siteData.site_title || 'Property Template';
    
    // Update favicon if available
    if (siteData.favicon) {
      const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = siteData.favicon;
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    
    localStorage.setItem('siteInfo', JSON.stringify(siteData));
    return siteData;
  } catch (error) {
    console.error('Failed to load site info', error);
    return {};
  }
}

async function bootstrapApp() {
  const siteData = await initSiteInfo();
  const app = createApp(App);
  app.provide('siteInfo', siteData);
  app.use(router);
  app.mount('#app');
}

bootstrapApp();
