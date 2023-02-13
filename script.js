// Lottie Preloader
const loader = document.querySelector(".loader");
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.style.display = "none";
  }, 2000);
});

const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}


const questions = [
    {
    number: 1,
    question: "Who was the Minister for Finance in Singapore's first cabinet?",
    answers: [
    { text: 'a. Goh Keng Swee', correct: true },
    { text: 'b. Ong Pang Boon', correct: false },
    { text: 'c. Toh Chin Chye', correct: false },
    { text: 'd. Sinnathamby Rajaratnam', correct: false }
    ],
    img_url: "./images/Goh_Keng_Swee.jpg"
    },
    {
    number: 2,
    question: "Who was the Minister for Home Affairs in Singapore's first cabinet?",
    answers: [
    { text: 'a. Ahmad Ibrahim', correct: false },
    { text: 'b. Goh Keng Swee', correct: false },
    { text: 'c. Ong Pang Boon', correct: true },
    { text: 'd. Toh Chin Chye', correct: false }
    ],
    img_url: "./images/Ong_Pang_Boon.jpg"
    },
    {
    number: 3,
    question: "Who was the Minister for Culture in Singapore's first cabinet?",
    answers: [
    { text: 'a. Ahmad Ibrahim', correct: false },
    { text: 'b. Sinnathamby Rajaratnam', correct: true },
    { text: 'c. Toh Chin Chye', correct: false },
    { text: 'd. Yusof Ishak', correct: false }
    ],
    img_url: "./images/Sinnathamby_Rajaratnam.jpg"
    },
    {
    number: 4,
    question: "Who was the Deputy Prime Minister in Singapore's first cabinet?",
    answers: [
    { text: 'a. Sinnathamby Rajaratnam', correct: false },
    { text: 'b. Goh Keng Swee', correct: false },
    { text: 'c. Toh Chin Chye', correct: true },
    { text: 'd. Ong Pang Boon', correct: false }
    ],
    img_url: "./images/Toh_Chin_Chye.jpg"
    },
    {
    number: 5,
    question: "Who was the Minister for Health in Singapore's first cabinet?",
    answers: [
    { text: 'a. Ahmad Ibrahim', correct: true },
    { text: 'b. Toh Chin Chye', correct: false },
    { text: 'c. Goh Keng Swee', correct: false },
    { text: 'd. Tony Tan Keng Yam', correct: false }
    ],
    img_url: "./images/Ahmad_Ibrahim.jpg"
    },
    {
    number: 6,
    question: "Who was the Prime Minister in Singapore's first cabinet?",
    answers: [
    { text: "a. Yusof Ishak", correct: false },
    { text: "b. Tony Tan Keng Yam", correct: false },
    { text: "c. Goh Keng Swee", correct: false },
    { text: "d. Lee Kuan Yew", correct: true }
    ],
    img_url: "./photos/Lee Kuan Yew.jpeg"
},
];