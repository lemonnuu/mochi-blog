<script setup>
import { onMounted, ref } from 'vue'
const teleportTarget = ref('')
onMounted(() => (teleportTarget.value = '.VPPage'))
</script>

<template>
  <Teleport v-if="teleportTarget" :to="teleportTarget">
    <slot></slot>
  </Teleport>
</template>

<style scoped lang="scss"></style>
