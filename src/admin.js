import Vue from 'vue'
import VueResource from 'vue-resource'
import AdminTable from './AdminTable.vue'
import UiButton from 'keen-ui/lib/UiButton'

Vue.use(VueResource);

new Vue({
  el: 'body',
  components: {
    AdminTable, UiButton
  }
});