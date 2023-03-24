<template>
  <div>home</div>
  <!-- 哪些角色可以显示这个按钮 -->
  <button v-btn-auth="['admin', 'editor']" @click="handleClick">添加</button>
  <button v-btn-auth="['admin', 'editor']">编辑</button>
  <button v-btn-auth="['admin', 'other']">删除</button>
</template>


<script>
import { useLoginUser, useRoute } from "../hooks";
import { useRouter } from 'vue-router'
import { defineComponent } from "vue";
// import { resetRoutes } from '../router'

export default defineComponent({
  setup() {
    const { routeState } = useRoute()

    const { user } = useLoginUser()

    const router = useRouter()

    function handleClick() {
      Object.assign(user, {token: ''})
    }

    debugger
    console.log(router.getRoutes())

    return {
      routeState,
      handleClick,
    }
  }
})
</script>
