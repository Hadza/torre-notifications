import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme:{
        themes: {
            dark: {
                primary: '#27292d',
                secondary: '#ccdc39',
                anchor: '#ccdc39'
            }
        }
    },
});
