import {questions}  from "./data.js";



const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const scoreMessage = document.getElementById('score-message');
const restartBtn = document.getElementById('restart-btn');
const totalQuestions = questions.length;



let currentQuestionIndex = 0;
let score = 0;




function startQuiz() {
    showQuestion();
}




function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];

        quizContainer.innerHTML = `

            <h2 class="text-lg font-bold mb-4">${question.question}</h2>
            <div class="text-xl ">
                ${question.options.map((option, index) => `
                    <label class="block mb-2">
                        <input 
                        type="radio" 
                        name="answer" 
                        value="${index}"
                        >
                        ${option}
                    </label>
                `).join('')}
            </div>
            <button id="next-btn" class="bg-blue-500 text-white text-center text-lg px-6 rounded-md py-2 mt-4
            hover:bg-black transform duration-500">Next</button>
        `;

        document.getElementById('next-btn').addEventListener('click', checkAnswer);
    } else {
        showResult();
    }
}





function checkAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');

    if (selectedAnswer) {
        const userAnswer = parseInt(selectedAnswer.value);

        if (userAnswer === questions[currentQuestionIndex].correctAnswer) {
            score++;
        }

        currentQuestionIndex++;
        showQuestion();
    }
}






function showResult() {

    resultContainer.classList.remove('hidden');
    quizContainer.classList.add('hidden');

    scoreMessage.textContent = `You scored ${score} out of ${totalQuestions}. ${getScoreMessage()}`;

    restartBtn.addEventListener('click', restartQuiz);
}







function getScoreMessage() {
    if (score === totalQuestions) {
        return `  Congratulations! You got all the questions right!`;

    } else if (score >= totalQuestions * 0.7) {
        return "Great job! You did well!";
    } else {
        return "Keep practicing. You can do better!";
    }
}






function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    startQuiz();
}




startQuiz();
