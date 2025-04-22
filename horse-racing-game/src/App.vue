<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useRoundStore } from '@/stores/roundStore'
import { useResultStore } from '@/stores/resultStore'
import { useHorseStore } from '@/stores/horseStore'
import MenuLeft from '@/components/Menu/Left.vue'
import MenuRight from '@/components/Menu/Right.vue'
import RaceTrack from '@/components/Race/Track.vue'

const roundStore = useRoundStore()
const resultStore = useResultStore()
const horseStore = useHorseStore()
const raceStatus = ref(false)

onMounted(() => {
  horseStore.generateHorses()
})

const rounds  = computed(() => roundStore.raceRounds)
const results = computed(() => resultStore.results)
const horses  = computed(() => horseStore.horses)

const raceStatusHandler = () => {
  raceStatus.value = !raceStatus.value
}

</script>

<template>
  <BaseHeader
    :race-status="raceStatus"
    :program-status="!!rounds?.length"
    @raceStarted="raceStatusHandler"
  />
  <div class="menu">
    <MenuLeft :items="horses" />
    <RaceTrack
      :race-status="raceStatus"
      @raceFinished="raceStatusHandler"
    />
    <MenuRight :rounds="rounds" :results="results"/>
  </div>
  <RouterView />
</template>

<style scoped>
.menu {
  display: flex;
  width: 80rem;
  font-size: 0.825rem;
  margin-top: 2rem;
}
</style>
