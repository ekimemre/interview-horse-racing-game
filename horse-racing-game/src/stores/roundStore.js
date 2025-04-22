import { defineStore } from 'pinia'
import { rounds } from '@/assets/json/rounds.json'
import { shuffleArray } from '@/utils/shuffle'
import { useHorseStore } from './horseStore'

export const useRoundStore = defineStore('round', {
	state: () => ({
		raceRounds: []
	}),
	getters: {},
	actions: {
		initializeRounds() {
			const horseStore = useHorseStore()
			this.raceRounds = rounds.map(item => {
				const shuffledHorses = shuffleArray(horseStore.horses).slice(0, 10);
				item.racers = shuffledHorses.map(h => {
					return {
						...h,
						position: 0,
						pct: 0,
						intervalId: (null),
						racerFinished: false,
					}
				});
				return item
			})
		},
		updateRacerPosition(roundIndex, racerId, positionIncrement) {
			const racer = this.raceRounds[roundIndex].racers.find(r => r.id === racerId);
			if (racer) {
				const increment = Number(positionIncrement);
				racer.position += increment;
			}
		},
		updateRacerPercentage(roundIndex, racerId, percentage) {
			const racer = this.raceRounds[roundIndex].racers.find(r => r.id === racerId);
			if (racer) {
				racer.pct = percentage;
			}
		},
		finishRacer(roundIndex, racerId) {
			const racer = this.raceRounds[roundIndex].racers.find(r => r.id === racerId);
			if (racer) {
				racer.racerFinished = true;
			}
		},
		finishRound(roundIndex) {
			if (this.raceRounds[roundIndex]) {
				this.raceRounds[roundIndex].roundFinished = true;
			}
			this.raceRounds[roundIndex].isActive = false;
		},
	}
})