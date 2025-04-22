<script setup>
const props = defineProps({
	items: {
		type: Array,
		default: () => []
	},
})
</script>

<template>
  <BaseTable 
    table-type="Competitor"
    title="Horse List"
    visible-title
    :colums="['Name', 'Condition', 'Color']"
    :rows="items"
  />
</template>