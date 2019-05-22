<template>
  <router-view :key="$route.path"></router-view>
</template>

<script>
import { APIService } from "./service/apiService.js";
import { API_URL_DEV, END_POINT } from "./service/apiRegister.js";
import {mapActions, mapGetters} from 'vuex'


const api = new APIService();

export default {
  name: 'app',
  methods: {
    ...mapActions({
      checkPeople: 'checkPeople'
    })
  },
  created() {
    this.checkPeople();
  },
  computed: {
    ...mapGetters({
      people: 'people'
    })
  },
  mounted() {
    if(this.people.provider == 'email') {
      api.get([END_POINT.users]).then(
      data => {
        this.partners = data.partners;
        this.loading = false;
      })
      .catch(function (err) {
        if(err.response.status === 401) {
          localStorage.clear();
          this.$router.push(['/']);
        }
      });
    } else if(this.people.provider == 'member') {
      
    }
  }
}
</script>

<style lang="scss">
  // CoreUI Icons Set
  @import '~@coreui/icons/css/coreui-icons.min.css';
  /* Import Font Awesome Icons Set */
  $fa-font-path: '~font-awesome/fonts/';
  @import '~font-awesome/scss/font-awesome.scss';
  /* Import Simple Line Icons Set */
  $simple-line-font-path: '~simple-line-icons/fonts/';
  @import '~simple-line-icons/scss/simple-line-icons.scss';
  /* Import Flag Icons Set */
  @import '~flag-icon-css/css/flag-icon.min.css';
  /* Import Bootstrap Vue Styles */
  @import '~bootstrap-vue/dist/bootstrap-vue.css';
  // Import Main styles for this application
  @import 'assets/scss/style';
</style>
