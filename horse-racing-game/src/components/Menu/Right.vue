<script setup>
import { ref } from 'vue'
import { useHorseStore } from '@/stores/horseStore'

const horseStore = useHorseStore()
const currentTab = ref('Program')

defineProps({
  rounds: {
    type: Array,
    default: () => [],
  },
	results: {
    type: Array,
    default: () => [],
  },
})

const getHorseNameList = (list) => {
	return list.map(item => {
		return horseStore.getById(item.condition)
	})
}
</script>

<template>
	<div>
		<BaseTabToggle v-model="currentTab" :options="['Program', 'Results']" />
		<template v-if="currentTab === 'Program'">
			<div v-for="(round) in rounds">
				{{ round.title }}
				<BaseTable
					table-type="Round"
					:colums="['Position', 'Name']"
					:rows="getHorseNameList(round.racers)"
				/>
			</div>
		</template>
		<template v-if="currentTab === 'Results'">
			<div v-for="(result) in results">
				{{ result.title }}
				<BaseTable
					table-type="Round"
					:colums="['Position', 'Name']"
					:rows="getHorseNameList(result.rows)"
				/>
			</div>
		</template>
	</div>
</template>
  
 