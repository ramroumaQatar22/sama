const questions = [];
const totalQuestions = 30; // You can change this to the number of questions you want
let currentQuestionIndex = 0;
let timer;
let timeLeft = 35; // Time in seconds
let correctCount = 0;
let incorrectCount = 0;
let corrections = [];

function generateQuestions() {
    for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
            questions.push({ num1: i, num2: j, answer: i * j });
        }
    }
    // Shuffle questions array for randomness
    questions.sort(() => Math.random() - 0.5);
}

function displayQuestion() {
    const questionElement = document.getElementById('question');
    questionElement.textContent = `${questions[currentQuestionIndex].num1} x ${questions[currentQuestionIndex].num2} = ?`;
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time').textContent = timeLeft;

        if (timeLeft === 0) {
            handleAnswer(false);
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function handleAnswer(isCorrect) {
    const feedbackElement = document.getElementById('feedback');
    const answerInput = document.getElementById('answer');
    const submitButton = document.getElementById('submit');

    stopTimer();

    if (isCorrect) {
        feedbackElement.textContent = '👏 Correct!';
        correctCount++;
    } else {
        feedbackElement.textContent = 'Oops! That\'s incorrect. Sama Don\'t give up, you can do it!';
        incorrectCount++;
        corrections.push({
            question: questions[currentQuestionIndex],
            userAnswer: parseInt(answerInput.value, 10),
        });
    }

    answerInput.disabled = true;
    submitButton.disabled = true;

    setTimeout(() => {
        feedbackElement.textContent = '';
        answerInput.value = '';
        answerInput.disabled = false;
        submitButton.disabled = false;
        timeLeft = 35;

        if (currentQuestionIndex < totalQuestions - 1) {
            currentQuestionIndex++;
            displayQuestion();
            startTimer();
        } else {
            showScore();
        }
    }, 2000);
}

function showScore() {
    document.getElementById('timer').style.display = 'none';
    document.getElementById('score').style.display = 'block';

    document.getElementById('correctCount').textContent = correctCount;
    document.getElementById('incorrectCount').textContent = incorrectCount;

    const correctionsElement = document.getElementById('corrections');
    if (corrections.length > 0) {
        correctionsElement.innerHTML = '<h3>Corrections:</h3>';
        corrections.forEach((correction, index) => {
            const correctionItem = document.createElement('p');
            correctionItem.textContent = `${index + 1}. ${correction.question.num1} x ${correction.question.num2} = ${correction.question.answer} (Your answer: ${correction.userAnswer})`;
            correctionsElement.appendChild(correctionItem);
        });
    }
}

document.getElementById('submit').addEventListener('click', () => {
    const userAnswer = parseInt(document.getElementById('answer').value, 10);

    if (!isNaN(userAnswer)) {
        const correctAnswer = questions[currentQuestionIndex].answer;
        handleAnswer(userAnswer === correctAnswer);
    }
});

generateQuestions();
displayQuestion();
startTimer();

