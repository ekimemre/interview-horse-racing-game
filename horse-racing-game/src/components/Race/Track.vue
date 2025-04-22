<script setup>
import { ref, computed, watch, nextTick, defineEmits } from 'vue'
import { useRoundStore } from '@/stores/roundStore'
import { useResultStore } from '@/stores/resultStore'
import HorseRunning from '../Icon/HorseRunningIcon.vue'
import HorseStanding from '../Icon/HorseStandingIcon.vue'

const roundStore = useRoundStore()
const resultStore = useResultStore()

const emit = defineEmits(['raceFinished'])
const props = defineProps({
  raceStatus: Boolean,
})

const rounds = computed({
  get: () => roundStore.raceRounds,
})

const trackRefs = ref([])
let maxDistance = 0

watch(
  () => props.raceStatus,
  async (status) => {
    if (status) {
      await nextTick()
      startRace(0)
    }
  }
)

const calculateDistance = (meter = 1000) => {
  const trackWidth = meter
  const iconWidth = 40
  maxDistance = trackWidth - iconWidth
}

const startRace = (index) => {
  calculateDistance(rounds.value.at(index).meter)
  const newRounds = [...rounds.value]
  newRounds[index].isActive = true
  const racers = newRounds[index].racers;
  const resultOrder = []
  
  racers.forEach(r => {
    r.intervalId = setInterval(() => {
      const increment = (Math.random() * 3) * Number(r.condition / 3)
      roundStore.updateRacerPosition(index, r.id, increment)
      const updatedRacer = [...rounds.value].at(index).racers.find(racer => racer.id === r.id);
      const ratio = Math.min(updatedRacer.position / maxDistance, 1);

      roundStore.updateRacerPercentage(index, r.id, ratio * 100);
      const updatedRacer2 = [...rounds.value].at(index).racers.find(racer => racer.id === r.id);
      if (ratio >= 1 && !updatedRacer.racerFinished) {
        roundStore.finishRacer(index, r.id);
        resultOrder.push(r)
        clearInterval(r.intervalId);
        
        const allFinished = newRounds[index].racers.every(x => x.racerFinished);
        if (allFinished) {
          roundStore.finishRound(index);
          resultStore.addRoundResults({ title: rounds.value.at(index).title, rows: resultOrder })
          if (index + 1 < rounds.value.length) startRace(index + 1)
        }
      }
    }, 100)
  })
}
</script>

<template>
  <template v-if="!rounds?.length">
    <div class="race-container">
    <div
      v-for="(l, i) in [1,2,3,4,5,6,7,8,9,0]"
      :key="l.id"
      class="track"
    >
      <HorseStanding class="icon" />
      <div class="finish-line" />
    </div>
  </div>
  </template>
  <div class="race-container-wrapper">
    <div v-for="(round, indx) in rounds" :key="indx" class="race-container">
      <div> {{ round.title }} </div>
      <div
        v-for="(r, i) in round?.racers"
        :key="i"
        class="track"
        :ref="el => trackRefs[i] = el"
      >
        {{ r?.name }}
        <HorseRunning
          v-if="round.isActive"
          class="icon"
          :style="{ transform: `translateX(${r.pct * 17}%)` }"
        />
        <HorseStanding v-else class="icon" />
        <div class="finish-line" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.race-container-wrapper {
  display: flex;
  flex-direction: column;
}

.race-container {
  width: 46rem;
  margin: 0 1rem;
  text-align: center;
  border: 1px solid #eee;
  border-radius: 0.375rem;
  height: min-content;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;

  .track {
    position: relative;
    width: 100%;
    height: 3.125rem;
    background: #eee;
    overflow: hidden;
    padding: 1rem;
    border-bottom: 1px solid #ad9a9a;

    .icon {
      position: absolute;
      left: 0;
      width: 2.5rem;
      height: 2.5rem;
      line-height: 2.5rem;
      text-align: center;
      font-size: 1.5rem;
    }

    .finish-line {
      position: absolute;
      top: 0;
      right: 1rem;
      width: 0.25rem;
      height: 100%;
      background: crimson;
    }
  }
}
</style>
