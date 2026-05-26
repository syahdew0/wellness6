# Vue 3 Company Profile Template (wellness6)

A modern, responsive company/listing website template built with Vue 3, TailwindCSS, and full CMS integration.

## Features

- ✨ Modern, responsive design with TailwindCSS
- 🎨 Custom color scheme (Dark Olive, Latte, Milk Foam)
- 📱 Mobile-first responsive layout
- 🔄 Dynamic content from CMS API
- 🏠 Company listing with filtering and pagination
- 📝 Blog and article management
- 💬 Contact forms and testimonials
- 🔍 Advanced search and filtering
- 🎯 SEO-friendly structure
- 🚀 Multi-environment build support

## Technology Stack

| Technology | Version |
|------------|---------|
| Vue | 3.2.13 |
| Vue Router | 4.5.1 |
| TailwindCSS | 3.4.17 |
| Axios | 1.10.0 |
| Font Awesome | 6.7.2 |
| Vue CLI | 5.0.0 |

## Project Structure

```
src/
├── App.vue                     # Root component
├── main.js                     # App bootstrap
├── public-path.js              # Webpack public path config
├── assets/
│   └── tailwind.css            # TailwindCSS styles
├── config/
│   └── api.js                  # API endpoints
├── router/
│   └── index.js                # Vue Router config
├── components/
│   ├── NavbarApp.vue           # Dynamic navbar
│   ├── FooterPage.vue          # Dynamic footer
│   └── sections/               # Section components
│       ├── HeroSection.vue
│       ├── AboutSection.vue
│       ├── ServicesSection.vue
│       ├── TestimonialsSection.vue
│       ├── FAQSection.vue
│       └── ContactSection.vue
└── views/                      # Page views
    ├── PageManagement.vue      # Home page
    ├── ListingPage.vue         # Listing page
    ├── ListingDetailPage.vue   # Detail page
    ├── BlogPage.vue            # Blog page
    ├── ContactPage.vue         # Contact page
    └── HelpPage.vue            # Help page
```

## Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd /Users/itgroup/Documents/program_code/wellness6
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   
   Edit `public/index.html` to set your API configuration:
   ```javascript
   window.APIS_URL = 'https://your-api-url.com';
   window.PATH_URL = '/';
   window.MENU_GROUP_SLUG = 'main';
   window.LISTING_TYPE = 1;           // Number, not string!
   window.LISTING_DISPLAY_IN = 8;     // Number, not string!
   ```

## Development

Run the development server:

```bash
npm run serve
```

The application will be available at `http://localhost:8080`

## Build

Build for different environments:

```bash
# Development build
npm run build

# Sandbox environment
npm run build:sandbox

# Staging environment
npm run build:staging

# Production environment
npm run build:production
```

## Configuration

### API Endpoints

All API endpoints are configured in `src/config/api.js`. The base URL is taken from `window.APIS_URL`.

Key endpoints:
- Site info and settings
- Custom pages for CMS content
- Menu items (navbar and footer)
- Listings (Company)
- Blog posts
- Categories

### Window Variables

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `APIS_URL` | String | Required | Base API URL |
| `PATH_URL` | String | `/` | Base path for router |
| `MENU_GROUP_SLUG` | String | `main` | Menu group identifier |
| `LISTING_TYPE` | **Number** | `1` | Listing type ID filter |
| `LISTING_DISPLAY_IN` | **Number** | `8` | Category display filter |

> **Important:** `LISTING_TYPE` and `LISTING_DISPLAY_IN` must be **numbers**, not strings!

### CMS Tag Mappings

Each section component inside `src/components/sections/` fetches dynamic content from specific CMS tags ending with suffix `28`. Below is the complete structure of tag names mapped by their folders and files:

#### 📁 `src/components/sections/`

##### 📄 `HeroSection.vue`
- `home_badge28` - Small kicker/badge text (e.g. "Welcome")
- `home_main28` - Main heading and subtitle content
- `home_buttonDaftar28` - Registration/booking primary call-to-action button
- `home_buttonKonsul28` - Consultation secondary call-to-action button
- `home_image_title28` - Right-side clinical highlight image and title overlay
- `home_security28` - Trust indicators (e.g., "BPOM Approved") and descriptions
- `home_badgeFloating1_28` - Floating credential badge 1 (e.g. "Top Rated Clinic")
- `home_badgeFloating2_28` - Floating credential badge 2 (e.g. "100% Aman")
- `home_atribut28` - Grid of individual clinical attributes/features (array of cards)

##### 📄 `AboutSection.vue`
- `about_badge28` - Section kicker/badge text
- `about_main28` - Main headline description and featured clinical image
- `about_core_value_card28` - Overlapping clinical values card content and badge
- `about_stat28` - Statistics counters deck (array of counters like treatments done, active specialists)
- `about_atribut28` - Key features and clinical values list (array of checkpoints)

##### 📄 `ServicesSection.vue`
- `service_badge28` - Services section kicker/badge text
- `service_main28` - Services grid main heading and description
- `service_item28` - Individual beauty treatment cards (array of items with icon, title, and description)
- `service_cta28` - Bottom dynamic doctor consultation CTA card and booking button

##### 📄 `companyListSection.vue`
- `propertyList_badge28` - Treatment catalog kicker/badge text
- `propertyList_main28` - Catalog header and subtitle text
- `propertyList_button28` - Dynamic view more catalog button

##### 📄 `FAQSection.vue`
- `faq_title28` - FAQ section kicker, title and description
- `faq_item28` - Dynamic accordions list (array of question and answer objects)

##### 📄 `ContactSection.vue`
- `contact_home_badge28` - Support kicker/badge text
- `contact_home_main28` - Primary contact panel heading and subtitle
- `contact_home_info28` - Contact cards (array of items including phone, email, and location details)
- `contact_home_button28` - Dynamic contact redirection action button

##### 📄 `TestimonialsSection.vue`
- `testimoni_badge28` - Testimonials section kicker/badge text
- `testimoni_title28` - Testimonial section headline and subtitle

## Features Detail

### Dynamic Navigation
- Menu items fetched from API based on `MENU_GROUP_SLUG`
- Logo fetched from API settings
- Mobile-responsive hamburger menu

### Listing Management
- Filter by category (extracted from listings)
- Search by title, location, description
- Sort by price (low to high, high to low)
- Pagination support
- Detail page with specifications and contact form

### CMS Integration
- All sections support dynamic content from CMS
- LocalStorage caching for performance
- Fallback to default values when CMS data unavailable

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Touch-friendly interactions

## Customization

### Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
colors: {
  primary: '#3F4A3C',    // Dark Olive
  secondary: '#C7A17A',  // Latte
  accent: '#EDE6D8',     // Milk Foam
}
```

### Fonts

Update `src/App.vue` to change the font family:

```css
font-family: 'Your Font', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
```

## Troubleshooting

### ESLint Errors with `defineProps`

All components using `defineProps` include the comment `/* global defineProps */` to prevent ESLint errors. If you add new components, make sure to include this comment.

### Categories Not Showing

Ensure:
1. `LISTING_DISPLAY_IN` is a **number** (not string)
2. Categories in your listings have matching `display_in` values
3. Listings are company filtered by `LISTING_TYPE`

### Build Errors

If you encounter build errors:
1. Clear node_modules: `rm -rf node_modules package-lock.json`
2. Reinstall: `npm install`
3. Try building again: `npm run build:production`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This is a template project. Feel free to use and modify as needed.

## Support

For issues or questions, please contact the development team.
