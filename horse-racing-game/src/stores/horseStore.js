import { defineStore } from 'pinia'
import { racehorses } from '@/assets/json/racehorses.json'
import { colors } from '@/assets/json/colors.json'
import { shuffleArray } from '@/utils/shuffle'
import { uuid } from '@/utils/uuid'
import { randomNumbers } from '@/utils/randomNumbers'

export const useHorseStore = defineStore('horse', {
  state: () => ({
    horses: []
  }),
  getters: {
    getById: (state) => {
      return (id) => state.horses.find(item => item.condition === id) || undefined;
    },
  },
  actions: {
    generateHorses() {
      const shuffledHorses = shuffleArray(racehorses).slice(0, 20);
      const shuffledColors = shuffleArray(colors);
      const conditions = randomNumbers(20)
      this.horses = shuffledHorses.map((name, i) => ({
        name,
        id: uuid(),
        condition: conditions[i],
        color: shuffledColors[i],
      }))
    }
  }
})
