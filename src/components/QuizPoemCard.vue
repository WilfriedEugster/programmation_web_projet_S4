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
	border: 1px solid #ccc;
	border-radius: 8px;
	padding: 10px 12px;
	background: white;
	cursor: pointer;
}

.quiz-poem-card:disabled {
	cursor: default;
}

.choice-author {
	display: block;
	margin-top: 4px;
	font-size: 0.95rem;
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
