<template>
	<section class="quiz">
		<h2>Quiz</h2>

		<div class="quiz-scoreboard">
			<p class="score good">Bonnes reponses : {{ correctAnswers }}</p>
			<p class="score bad">Mauvaises reponses : {{ wrongAnswers }}</p>
		</div>

		<p class="quiz-instruction">
			Quelle oeuvre contient cette ligne ?
		</p>

		<blockquote v-if="question" class="quiz-line">
			"{{ question.line }}"
		</blockquote>

		<div v-if="question" class="quiz-choices">
			<QuizPoemCard
				v-for="choice in question.choices"
				:key="choice.id"
				:title="choice.title"
				:author="choice.author"
				:state="getChoiceState(choice.id)"
				:disabled="hasAnswered"
				@select="submitAnswer(choice.id)"
			/>
		</div>

		<p v-if="hasAnswered" class="quiz-feedback" :class="isGoodAnswer ? 'good' : 'bad'">
			{{
				isGoodAnswer
					? 'Bonne reponse !'
					: 'Mauvaise reponse. La bonne est affichée en vert.'
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
import QuizPoemCard from "./QuizPoemCard.vue";

const CORRECT_ANSWERS_KEY = "quiz-correct-answers";
const WRONG_ANSWERS_KEY = "quiz-wrong-answers";

const readStoredCount = (key) => {
	const rawValue = localStorage.getItem(key);
	const parsed = Number(rawValue);
	if (!Number.isFinite(parsed) || parsed < 0) return 0;
	return Math.floor(parsed);
};

const saveCount = (key, value) => {
	localStorage.setItem(key, String(value));
};

const allPoems = poemsData.filter(
	(poem) => Array.isArray(poem.lines) && poem.lines.some((line) => line.trim() !== "")
);

const question = ref(null);
const selectedChoiceId = ref(null);
const hasAnswered = ref(false);
const correctAnswers = ref(readStoredCount(CORRECT_ANSWERS_KEY));
const wrongAnswers = ref(readStoredCount(WRONG_ANSWERS_KEY));

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
	if (hasAnswered.value || !question.value) return;
	selectedChoiceId.value = choiceId;
	hasAnswered.value = true;

	if (choiceId === question.value.correctId) {
		correctAnswers.value += 1;
		saveCount(CORRECT_ANSWERS_KEY, correctAnswers.value);
		return;
	}

	wrongAnswers.value += 1;
	saveCount(WRONG_ANSWERS_KEY, wrongAnswers.value);
};

const getChoiceState = (choiceId) => {
	if (!hasAnswered.value || !question.value) return "neutral";
	if (choiceId === question.value.correctId) return "correct";
	if (choiceId === selectedChoiceId.value) return "wrong";
	return "neutral";
};

buildQuestion();
</script>

<style scoped>
.quiz {
	max-width: 800px;
	margin: 0 auto;
	padding: 16px;
}

.quiz-scoreboard {
	display: flex;
	gap: 14px;
	margin-bottom: 12px;
	flex-wrap: wrap;
}

.score {
	margin: 0;
	font-weight: 600;
}

.score.good {
	color: #2f9e44;
}

.score.bad {
	color: #d63333;
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