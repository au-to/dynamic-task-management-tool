<template>
  <router-view />
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user.ts'

const userStore = useUserStore()
userStore.initialize()
</script>

<style scoped>

</style>