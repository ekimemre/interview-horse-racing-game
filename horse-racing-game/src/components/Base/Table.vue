<script setup>
defineProps({
	columns: {
		type: Array,
		default: () => []
	},
	rows: {
		type: Array,
		required: true
	},
	visibleTitle: {
		type: Boolean,
		default: false,
	},
	customSlot: {
		type: Boolean,
		default: false,
	},
	title: {
		type: String,
		default: '',
	},
	tableType: {
		type: String,
		default: 'Competitor',
	},
})
</script>

<template>
	<div class="table-view" :style="`width: ${tableType === 'Competitor' ? '22rem' : '12rem'}`">
		<div v-if="visibleTitle" class="table-view__header">
			<h4>{{ title }}</h4>
		</div>
		<template v-if="customSlot">
			<slot name="header"></slot>
		</template>
		<table class="table-view__table">
			<thead>
				<tr>
					<th v-for="col in columns" :key="col">{{ col }}</th>
				</tr>
			</thead>
			<tbody v-if="tableType === 'Competitor'">
				<tr v-for="(row, index) in rows" :key="index">
					<td class="name"> {{ row.name }} </td>
					<td> <span class="badge number">{{ row.condition }}</span> </td>
					<td>
						<span class="color-box" :style="{ border: '1px solid #eee', backgroundColor: row.color.hex }"></span>
						{{ row.color.name }}
					</td>
				</tr>
			</tbody>
			<tbody v-if="tableType === 'Round'">
				<tr v-for="(row, index) in rows" :key="index">
					<td>{{ index + 1 }}</td>
					<td class="name">{{ row.name }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
  
<script>
export default {
	name: "Table",
};
</script>
  
<style scoped lang="scss">
.table-view {
	height: min-content;
	background: white;
	border-radius: 0.625rem;
	border: 1px solid #eee;

	&__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-weight: bold;
		font-size: 1.1rem;
		padding: 0.5rem;
	}

	&__table {
		border-top: 1px solid #eee;
		width: 100%;
		border-collapse: collapse;

		th {
			text-align: left;
			padding: 0.55rem;
		}

		td {
			padding: 0.55rem;
			vertical-align: middle;
			border-top: 1px solid #eee;
		}
		.name {
			display: flex;
			align-items: center;
			gap: 0.5rem;
		}
		
		.badge.number {
			padding: 0.25rem 0.75rem;
			background-color: #dedede;
			border-radius: 999px;
			font-size: 0.8rem;
			font-weight: 500;
		}
		
		.color-box {
			display: inline-block;
			width: 1rem;
			height: 1rem;
			border-radius: 0.25rem;
			margin-right: 0.5rem;
			vertical-align: middle;
		}
	}
}
</style>
  