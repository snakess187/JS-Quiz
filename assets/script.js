const startBtn = document.getElementById('startBtn');
const quizContainer = document.getElementById('quizContainer');
const timerEl = document.getElementById('timer');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const gameOver = document.getElementById('gameOver');
const scoreEl = document.getElementById('score');
const initialsInput = document.getElementById('initials');
const saveBtn = document.getElementById('saveBtn');

const questions = [
    { question:'Whats and example of a higher function ?', options: ['takes one or more functions as arguments', 'a function with the ability to call intenaroy operators', 'a function that has more than two parameters', 'a function with imbeded varibles in the body'], correctAnswer: 'takes one or more functions as arguments' },
     { question: "What best describes API for coding? ", options: ["apple pears iglus", "application desighn information", "application programing iterface ", "application programing iteration"], correctAnswer: "application programing iterface"},
     { question: "What is a DOM?", options: ["Defense Orietated Mathmatics", "Document Object Model", "Document orientated Model", "Document  Object Mathmatics"], correctAnswer: "Document Object Model"},
     { question: "What is a DOM?", options: ["Defense Orietated Mathmatics", "Document Object Model", "Document orientated Model", "Document  Object Mathmatics"], correctAnswer: "Document Object Model"},
    { question: "What is Fetch API?", options: ["Retrieve files such jSON", " Retrieves elements from other variables", "is only used in higher functions", "Fetches parameters from the function"], correctAnswer: "Retrieve files such jSON"},
    { question: "What is web storage API?", options: ["local storage & external storage", "cloud Storage and source storage", "loca scotrage and session storage", "local storage and cloud sotrage"], correctAnswer: "loca scotrage and session storage"}
    
   
    

];

let currentIndex = 0;
let score = 0;
let timeLeft = 60; // 60 seconds for the quiz

startBtn.addEventListener('click', startQuiz);
optionsEl.addEventListener('click', handleOptionClick);
saveBtn.addEventListener('click', saveScore);

function startQuiz() {
    startBtn.style.display = 'none';
    quizContainer.style.display = 'block';
    timerEl.textContent = 'Time Left: ' + timeLeft + 's';
    const timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = 'Time Left: ' + timeLeft + 's';
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
    displayQuestion();
}

function displayQuestion() {
    if (currentIndex >= questions.length) {
        endGame();
        return;
    }
    const currentQuestion = questions[currentIndex];
    questionEl.textContent = currentQuestion.question;
    optionsEl.innerHTML = '';
    currentQuestion.options.forEach((option) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option');
        optionsEl.appendChild(button);
    });
}
// removes 10 seconds off 
function handleOptionClick(event) {
    if (event.target.matches('.option')) {
        const selectedOption = event.target.textContent;
        if (selectedOption === questions[currentIndex].correctAnswer) {
            score++;
        } else {
            timeLeft -= 10;
        }
        currentIndex++;
        displayQuestion();
    }
}

function endGame() {
    quizContainer.style.display = 'none';
    gameOver.style.display = 'block';
    scoreEl.textContent = score;
}

function saveScore() {
    const initials = initialsInput.value.toUpperCase();
    if (initials === '') return;

    let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    const newScore = {
        initials: initials,
        score: score,
    };

    highScores.push(newScore);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    initialsInput.value = '';

    // Redirect or display high scores
}
function getTopThreeScores(highScores) {
    return highScores.sort((a, b) => b.score - a.score).slice(0, 3);
  }
  
  function endGame() {
    quizContainer.style.display = 'none';
    gameOver.style.display = 'block';
    scoreEl.textContent = score;

    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    const topThreeScores = getTopThreeScores(highScores);

    const scoreTable = document.getElementById('scoreTable');

    // Clear the table body before adding new scores
    scoreTable.innerHTML = '<tr><th>Initials</th><th>Score</th></tr>';

    // Loop through the top three scores and add them to the table
    for (let i = 0; i < topThreeScores.length; i++) {
      const initials = topThreeScores[i].initials;
      const score = topThreeScores[i].score;

      const row = scoreTable.insertRow(i + 1);
      const initialsCell = row.insertCell(0);
      const scoreCell = row.insertCell(1);

      initialsCell.innerHTML = initials;
      scoreCell.innerHTML = score;
    }
}


function saveScore() {
    const initials = initialsInput.value.toUpperCase();
    if (initials === '') return;

    let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    const newScore = {
        initials: initials,
        score: score,
    };

    highScores.push(newScore);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    initialsInput.value = '';

    // Call endGame() to update the high scores table
    endGame();
}


