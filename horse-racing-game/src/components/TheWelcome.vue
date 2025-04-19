<script setup>
import HorseRunning from './icons/HorseRunningIcon.vue'
import HorseStanding from './icons/HorseStandingIcon.vue'

const openReadmeInEditor = () => fetch('/__open-in-editor?file=README.md')
</script>

<template>
  <HorseRunning />
  <HorseStanding />
</template>
