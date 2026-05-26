// export const API_URL = 'http://localhost:3001';
// export const API_URL = 'https://your-api-host.com'; // optional alternative when not using injected APIS_URL
export const API_URL = window.APIS_URL;

export const API_ENDPOINTS = {
  siteInfo: () => `${API_URL}/apis/public/site-info`,
  customPages: `${API_URL}/apis/custom-pages/frontend`,
  adminCustomPages: `${API_URL}/api/admin/custom-pages`,
  menuListByGroup: (group) => `${API_URL}/apis/menu-list?group=${group}`,
  FOOTER_MENU: `${API_URL}/apis/footer`,
  websiteSchema: (id) => `${API_URL}/api/admin/themes/${id}/active-theme`,
  activeTheme: (websiteId) => `${API_URL}/api/admin/themes/${websiteId}/active-theme`,
  siteSettingsPublic: (id) => `${API_URL}/api/admin/websites/public/${id}/settings`,
  settingLogo: `${API_URL}/api/setting-logo`,
  posts: `${API_URL}/apis/posts`,
  postBySlug: (slug) => `${API_URL}/apis/posts/slug/${slug}`,
  allPosts: () => `${API_URL}/apis/posts`,
  categories: `${API_URL}/apis/categories`,
  pages: `${API_URL}/apis/admin/posts`,
  pageBySlug: (slug) => `${API_URL}/apis/admin/posts/page/${slug}`,
  getCommentsBySlug: (slug) => `${API_URL}/apis/comments/post/${slug}`,
  createComment: `${API_URL}/apis/comments`,
  
  // Listing endpoints
  listings: `${API_URL}/apis/customer/listing`,
  listingDetail: (postId) => `${API_URL}/apis/customer/listing/${postId}`,
  categoriesByDisplayIn: (displayIn) => `${API_URL}/apis/categories?display_in=${displayIn}`,

  // Testimonials endpoint
  testimonials: `${API_URL}/apis/posts?type=testimonial`,
};

export default API_ENDPOINTS;
