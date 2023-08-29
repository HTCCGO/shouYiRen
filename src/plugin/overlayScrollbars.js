import OverlayScrollbars from 'overlayscrollbars';
import 'overlayscrollbars/overlayscrollbars.css';

export default {
  install(Vue) {
    Vue.prototype.$overlayScrollbars = OverlayScrollbars;
  }
};