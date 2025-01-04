<template>
  <router-view />
</template>

<script setup lang="ts">
import useUserStore from '@/src/store/modules/user.ts'

const userStore = useUserStore()
userStore.initialize()
</script>

<style scoped>

</style>