import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { firestorePlugin } from 'vuefire'
import { messaging } from "@/db";

Vue.config.productionTip = false
Vue.use(firestorePlugin)
 console.log(messaging)

navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      messaging.useServiceWorker(registration)
    }).catch(err => {
  console.log('Error registering service worker',err)
})

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
