import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App).use(router);
app.mount('#app');
if (typeof document !== 'undefined') {
  document.body.classList.add('vue-ready');
}
