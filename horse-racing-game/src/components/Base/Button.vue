<script setup>
defineProps({
  type: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'race'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
	<button
		:class="['base-button', `base-button--${type}`, { 'base-button--disabled': disabled }]"
		@click="$emit('clicked')"
	>
		<slot name="icon"></slot>
		<slot />
	</button>
</template>
  
<script>
export default {
	name: 'Button',
}
</script>
  
<style lang="scss" scoped>
.base-button {
	display: inline-flex;
	align-items: center;
	gap: 0.25rem;
	padding: 0.5rem 0.75rem;
	font-size: 0.875rem;
	border-radius: 0.375rem;
	cursor: pointer;
	transition: background-color 0.2s ease;

	&--default {
		background-color: #ffffff;
		color: #374151;
		border: 1px solid  --color-border;

		&:hover {
			background-color: #f3f4f6;
		}
	}

	&--race {
		background-color: #15a82b;
		color: #ffffff;
		border: 1px solid  --color-border;

		&:hover {
			background-color: #129025;
		}
	}

	&--disabled {
		pointer-events: none;
		background-color: #a9a9a9;
	}
}
</style>
  