// Lottie Preloader
const loader = document.querySelector(".loader");
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.style.display = "none";
  }, 2000);
});

// Get DOM elements
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

// Initialize variables
let shuffledQuestions, currentQuestionIndex

// Add event listeners
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

// Start game function
function startGame() {
  // Hide start button and show questions container
  startButton.classList.add('hide')
  questionContainerElement.classList.remove('hide')
  
  // Shuffle the questions and initialize variables
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  
  // Display first question
  setNextQuestion()
}

// Display the next question
function setNextQuestion() {
  // Reset answer button styles
  resetState()
  
  // Show the next question
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

// Display the question and answer choices
function showQuestion(question) {
  // Display the question text
  questionElement.innerText = question.question
  
  // Create a button for each answer choice
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    
    // Set the data attribute to indicate if the answer is correct
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    
    // Add event listener to each answer choice button
    button.addEventListener('click', selectAnswer)
    
    // Append the answer choice button to the answer buttons element
    answerButtonsElement.appendChild(button)
  })
}

// Reset the answer button styles
function resetState() {
  // Clear the status class for the body element
  clearStatusClass(document.body)
  
  // Hide the next button
  nextButton.classList.add('hide')
  
  // Remove all answer choice buttons
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

// Select an answer choice
function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  
  // Set the status class for the body element and each answer choice button
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  
  // Show the next button if there are more questions, otherwise show the restart button
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

// Set the status class for an element
function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

// Clear the status class for an element
function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}



const questions = [
  {
    // First question object
    question: "Who was the Minister for Finance in Singapore's first cabinet?",
    answers: [
      { text: 'a. Goh Keng Swee', correct: true },
      { text: 'b. Ong Pang Boon', correct: false },
      { text: 'c. Toh Chin Chye', correct: false },
      { text: 'd. Sinnathamby Rajaratnam', correct: false }
    ],
    img_url: "./images/Goh_Keng_Swee.jpg" // Image URL for this question
  },
  {
    // Second question object
    question: "Who was the Minister for Home Affairs in Singapore's first cabinet?",
    answers: [
      { text: 'a. Ahmad Ibrahim', correct: false },
      { text: 'b. Goh Keng Swee', correct: false },
      { text: 'c. Ong Pang Boon', correct: true },
      { text: 'd. Toh Chin Chye', correct: false }
    ],
    img_url: "./images/Ong_Pang_Boon.jpg" // Image URL for this question
  },
  {
    // Third question object
    question: "Who was the Minister for Culture in Singapore's first cabinet?",
    answers: [
      { text: 'a. Ahmad Ibrahim', correct: false },
      { text: 'b. Sinnathamby Rajaratnam', correct: true },
      { text: 'c. Toh Chin Chye', correct: false },
      { text: 'd. Yusof Ishak', correct: false }
    ],
    img_url: "./images/Sinnathamby_Rajaratnam.jpg" // Image URL for this question
  },
  {
    // Fourth question object
    question: "Who was the Deputy Prime Minister in Singapore's first cabinet?",
    answers: [
      { text: 'a. Sinnathamby Rajaratnam', correct: false },
      { text: 'b. Goh Keng Swee', correct: false },
      { text: 'c. Toh Chin Chye', correct: true },
      { text: 'd. Ong Pang Boon', correct: false }
    ],
    img_url: "./images/Toh_Chin_Chye.jpg" // Image URL for this question
  },
  {
    // Fifth question object
    question: "Who was the Minister for Health in Singapore's first cabinet?",
    answers: [
      { text: 'a. Ahmad Ibrahim', correct: true },
      { text: 'b. Toh Chin Chye', correct: false },
      { text: 'c. Goh Keng Swee', correct: false },
      { text: 'd. Tony Tan Keng Yam', correct: false }
    ],
    img_url: "./images/Ahmad_Ibrahim.jpg" // Image URL for this question
  },
  {
    // Sixth question object
    question: "Who was the Prime Minister in Singapore's first cabinet?",
    answers: [
      { text: "a. Yusof Ishak", correct: false },
      { text: "b. Tony Tan Keng Yam", correct: false },
      { text: "c. Goh Keng Swee", correct: false },
      { text: "d. Lee Kuan Yew", correct: true }
    ],
    img_url: "./photos/Lee Kuan Yew.jpeg" // Image URL for this question
  },
];
