<script setup>
import { computed } from 'vue'

const props = defineProps({
	options: {
		type: Array,
		default: () => ['Program', 'Results']
	},
	modelValue: {
		type: String,
		default: ''
	}
})

const emit = defineEmits(['update:modelValue'])

const selected = computed({
	get: () => props.modelValue || props.options[0],
	set: val => emit('update:modelValue', val)
})

const select = (opt) => {
	if (opt !== selected.value) {
		selected.value = opt
	}
}
</script>

<template>
	<div class="tab-toggle">
		<BaseButton
			v-for="(opt, i) in options"
			:key="i"
			:class="['tab-toggle__btn', { 'tab-toggle__btn--active': opt === selected }]"
			@clicked="select(opt)"
		>
			{{ opt }}
		</BaseButton>
	</div>
</template>
  
<style lang="scss" scoped>
.tab-toggle {
  display: flex;
  justify-content: center;
  width: 12rem;
  background: #f3f4f6;
  border-radius: 9999px;
  overflow: hidden;
  box-shadow: inset 0 0 0 1px #e5e7eb;

  &__btn {
    flex: 1;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    line-height: 1;
    color: #4b5563;
    background: transparent;
    border: none;
    cursor: pointer;
    border-radius: 0 !important;
  }

  &__btn--active {
    background: #3b82f6;
    color: #ffffff;
    pointer-events: none;
  }
}
</style>
  