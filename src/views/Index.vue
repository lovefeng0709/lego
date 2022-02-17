<template>
  <div class="homepage-container">
    <a-layout :style="{ background: '#fff' }">
      <a-layout-header class="header">
        <div class="page-title">
          <router-link to="/">乐高 </router-link>
        </div>
        <div>
          <user-profile :user="user" />
        </div>
      </a-layout-header>
      <a-layout-content class="home-layout">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
    <a-layout-footer> © xxxx版权所有 | 津ICP备20000929号-2 </a-layout-footer>
  </div>
</template>

<script lang="ts">
import { defineComponent,computed } from "vue";
import { useStore} from "vuex"
import UserProfile from "../components/UserProfile.vue"
export default defineComponent({
  components:{
    UserProfile
  },
  setup() {
    const store = useStore()
    const user = computed(() => store.state.user)
    return {
       user
    }
  }
});
</script>

<style scoped>
.header{
  display:flex;
  justify-content:space-between;
  align-items: center; 
}
</style>