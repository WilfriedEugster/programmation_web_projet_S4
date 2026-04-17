<template>
	<section class="quiz">
		<h2>Quiz</h2>

		<p class="quiz-instruction">
			Quelle oeuvre contient cette ligne ?
		</p>

		<blockquote v-if="question" class="quiz-line">
			"{{ question.line }}"
		</blockquote>

		<div v-if="question" class="quiz-choices">
			<button
				v-for="choice in question.choices"
				:key="choice.id"
				class="quiz-choice"
				:class="getChoiceClass(choice.id)"
				:disabled="hasAnswered"
				@click="submitAnswer(choice.id)"
			>
				<strong>{{ choice.title }}</strong>
				<span class="choice-author">{{ choice.author }}</span>
			</button>
		</div>

		<p v-if="hasAnswered" class="quiz-feedback" :class="isGoodAnswer ? 'good' : 'bad'">
			{{
				isGoodAnswer
					? 'Bonne reponse !'
					: 'Mauvaise reponse. La bonne etait en vert.'
			}}
		</p>

		<button class="next-question" @click="buildQuestion">
			Nouvelle question
		</button>
	</section>
</template>

<script setup>
import { computed, ref } from "vue";
import poemsData from "../William Shakespeare.json";

const allPoems = poemsData.filter(
	(poem) => Array.isArray(poem.lines) && poem.lines.some((line) => line.trim() !== "")
);

const question = ref(null);
const selectedChoiceId = ref(null);
const hasAnswered = ref(false);

const isGoodAnswer = computed(() => {
	if (!question.value || !hasAnswered.value) return false;
	return selectedChoiceId.value === question.value.correctId;
});

const randomIndex = (max) => Math.floor(Math.random() * max);

const pickRandomLine = (lines) => {
	const nonEmptyLines = lines.filter((line) => line.trim() !== "");
	return nonEmptyLines[randomIndex(nonEmptyLines.length)];
};

const poemId = (poem) => `${poem.title}__${poem.author}`;

const buildQuestion = () => {
	if (allPoems.length < 3) {
		question.value = null;
		return;
	}

	hasAnswered.value = false;
	selectedChoiceId.value = null;

	const correctPoem = allPoems[randomIndex(allPoems.length)];
	const wrongCandidates = allPoems.filter((poem) => poemId(poem) !== poemId(correctPoem));

	const wrongChoices = [];
	while (wrongChoices.length < 2) {
		const candidate = wrongCandidates[randomIndex(wrongCandidates.length)];
		const candidateId = poemId(candidate);
		if (!wrongChoices.some((choice) => choice.id === candidateId)) {
			wrongChoices.push({
				id: candidateId,
				title: candidate.title,
				author: candidate.author,
			});
		}
	}

	const choices = [
		{
			id: poemId(correctPoem),
			title: correctPoem.title,
			author: correctPoem.author,
		},
		...wrongChoices,
	].sort(() => Math.random() - 0.5);

	question.value = {
		line: pickRandomLine(correctPoem.lines),
		correctId: poemId(correctPoem),
		choices,
	};
};

const submitAnswer = (choiceId) => {
	if (hasAnswered.value) return;
	selectedChoiceId.value = choiceId;
	hasAnswered.value = true;
};

const getChoiceClass = (choiceId) => {
	if (!hasAnswered.value || !question.value) return "";
	if (choiceId === question.value.correctId) return "choice-correct";
	if (choiceId === selectedChoiceId.value) return "choice-wrong";
	return "";
};

buildQuestion();
</script>

<style scoped>
.quiz {
	max-width: 800px;
	margin: 0 auto;
	padding: 16px;
}

.quiz-instruction {
	margin-bottom: 10px;
}

.quiz-line {
	margin: 0 0 18px;
	padding: 12px;
	border-left: 4px solid #999;
	background: #f7f7f7;
}

.quiz-choices {
	display: grid;
	gap: 10px;
}

.quiz-choice {
	text-align: left;
	border: 1px solid #ccc;
	border-radius: 8px;
	padding: 10px 12px;
	background: white;
	cursor: pointer;
}

.quiz-choice:disabled {
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

.quiz-feedback {
	margin-top: 12px;
	font-weight: 600;
}

.quiz-feedback.good {
	color: #2f9e44;
}

.quiz-feedback.bad {
	color: #d63333;
}

.next-question {
	margin-top: 14px;
	border: 1px solid #ccc;
	border-radius: 8px;
	padding: 8px 12px;
	background: white;
	cursor: pointer;
}
</style>