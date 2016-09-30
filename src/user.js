import Vue from 'vue'
import VueResource from 'vue-resource'
import FilesTable from './FileTable.vue'
import UiButton from 'keen-ui/lib/UiButton'
import UiTextbox from 'keen-ui/lib/UiTextbox'

Vue.use(VueResource);

new Vue({
  el: 'body',
  components: {
    FilesTable, UiButton, UiTextbox
  }
});