import { Debounced } from './component.js';

export default {
  install(Vue) {
    Vue.component('Debounced', Debounced);
  },
  Debounced
}
