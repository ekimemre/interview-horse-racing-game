<script setup>
import { useRoundStore } from '@/stores/roundStore'
import HorseRunning from '../Icon/HorseRunningIcon.vue'

const roundStore = useRoundStore()

const emit = defineEmits(['raceStarted'])

const props = defineProps({
  raceStatus: Boolean,
  programStatus: Boolean,
})

const generateProgram = () => {
  roundStore.initializeRounds()
}
const startRace = () => {
  emit('raceStarted', true)
}
</script>

<template>
  <header class="header">
    <div class="header__left">
      <HorseRunning class="header__icon"/>
      <h1 class="header__title">Horse Racing Simulation</h1>
    </div>
    <div class="header__right">
      <BaseButton
        type="race"
        :disabled="raceStatus || !programStatus"
        @clicked="startRace"
      >
          Start
      </BaseButton>
      <BaseButton
        type="default"
        :disabled="raceStatus"
        @clicked="generateProgram"
      >
          Generate Program
      </BaseButton>
    </div>
  </header>
</template>
  
<script>
export default {
  name: 'Header',
}
</script>
  
<style lang="scss" scoped>
.header {
  display: flex;
  width: 80rem;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: var(--color-background-soft);

  &__left {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &__icon {
    width: 2.25rem;
    height: 2.25rem;
  }

  &__title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1f2937;
  }
  
  &__right {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
}
</style>
    