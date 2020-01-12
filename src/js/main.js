/*
  InstaGPX (instagpx.com) · Add GPX activity stats to your photos.
  Copyright (c) 2019-2020 by Jorge Moreno, moro.es (@alterebro)

  This program is under the terms of the GNU General Public License v3.0
  https://www.gnu.org/licenses/gpl-3.0.en.html
*/

import Vue from 'vue';
import App from './vue/App.vue';

const Main = new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
});
