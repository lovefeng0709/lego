<template>
  <a-button type="primary" v-if="!user.isLogin" @click="login">
      登录
  </a-button>
  <a-dropdown-button  v-else >
      {{user.userName}}
      <template #overlay>
        <a-menu >
          <a-menu-item key="1">
            <UserOutlined />
            1st menu item
          </a-menu-item>
          <a-menu-item key="2">
            <UserOutlined />
            2nd menu item
          </a-menu-item>
          <a-menu-item key="3" @click="loginOut">
            <UserOutlined />
            登出
          </a-menu-item>
        </a-menu>
      </template>
  </a-dropdown-button>
</template>

<script lang="ts">
import { UserProps } from "@/store/user"
import { message } from "ant-design-vue"
import { defineComponent,PropType } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"
export default defineComponent({
  props:{
   user: {
      type: Object as PropType<UserProps>,
      required: true
      }
   },
   setup() {
     const store = useStore()
     const router = useRouter()
     const login = ()=> {
       store.commit('login');
       message.success('登录成功！');
     }
     const loginOut = ()=>{
       store.commit('loginOut')
       message.success('退出登录成功，2秒后跳转到首页', 2)
      setTimeout(() => {
        router.push('/')
      }, 2000)
     }
     return {
       login,
       loginOut
     }
   }
})
</script>

<style  scoped>

</style>