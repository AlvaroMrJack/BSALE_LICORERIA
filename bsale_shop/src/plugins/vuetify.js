import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: '#FE4A49',
        secondary: '#FED766',
        accent: '#E3E3E3',
        error: '#F80202',
        info: '#009FB7',
        success: '#548C2F',
        warning: '#F2E86D'
      },
    },
  },
});
