import { defineStore } from 'pinia'

export const useResultStore = defineStore('result', {
	state: () => ({
		results: []
	}),
	getters: {},
	actions: {
		addRoundResults(result) {
			this.results.push(result)
		}
	}
})