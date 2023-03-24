<template>
  <!-- <template v-for="route in routes" :key="route.path">
    <router-link v-if="checkRoutePermission(route.meta?.roles)" :to="route.path">
      {{ route.meta.title }}
    </router-link>
  </template> -->
  <template v-for="route in routeState.routes" :key="route.path" >
    <router-link v-if="!route.hidden" :to="route.path" style="margin-right: 6px">
      {{ route.name }}
    </router-link>
  </template>

  <router-view />
</template>

<script>
import { useRoute } from "./hooks";
import { defineComponent } from "vue";
import { a, b } from './router'

export default defineComponent({
  setup() {
    const { routeState } = useRoute()
    console.log(a, b)

    return {
      routeState,
    }
  }
})
</script>
