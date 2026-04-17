<template>
	<button
		class="quiz-poem-card"
		:class="stateClass"
		:disabled="disabled"
		@click="$emit('select')"
	>
		<strong>{{ title }}</strong>
		<span class="choice-author">{{ author }}</span>
	</button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
	title: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
	state: {
		type: String,
		default: "neutral",
		validator: (value) => ["neutral", "correct", "wrong"].includes(value),
	},
	disabled: {
		type: Boolean,
		default: false,
	},
});

defineEmits(["select"]);

const stateClass = computed(() => {
	if (props.state === "correct") return "choice-correct";
	if (props.state === "wrong") return "choice-wrong";
	return "";
});
</script>

<style scoped>
.quiz-poem-card {
	text-align: left;
	border: 1px solid var(--ui-border-color);
	border-radius: var(--ui-radius);
	padding: var(--ui-padding-md);
	background: var(--ui-bg);
	cursor: pointer;
	width: 100%;
	box-sizing: border-box;
}

.quiz-poem-card:disabled {
	cursor: default;
}

.choice-author {
	display: block;
	margin-top: 4px;
	font-size: var(--font-size-sm);
	color: #555;
}

.choice-correct {
	background: #e7f7e8;
	border-color: #2f9e44;
}

.choice-wrong {
	background: #fdeaea;
	border-color: #d63333;
}
</style>
