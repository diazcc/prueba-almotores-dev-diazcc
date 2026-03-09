// main.ts
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router.ts';
import './style.scss';
import 'v-calendar/style.css';
import { setupCalendar } from 'v-calendar';
import { createI18n } from 'vue-i18n';
import lang from './locales/lang.js';
import { languageStore } from './store/language.ts';
import axios from 'axios';

// 👇 Importa tu configuración de Firebase (importante)
import './firebaseConfig';  // ✅ Esta línea asegura que initializeApp() se ejecute

const app = createApp(App);

// Configurar axios con el token si existe
const token = localStorage.getItem('idToken');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Initialize pinia
const pinia = createPinia();
app.use(pinia);

const langStore = languageStore();

// Configuración de i18n
const i18n = createI18n({
  legacy: false,
  messages: lang,
  fallbackFormat: true,
  locale: langStore.getLocale(),
  fallbackWarn: false,
  missingWarn: false,
  missing: (locale, key) => key,
});

app.use(setupCalendar, {});
app.use(router);
app.use(i18n);
app.mount('#app');
