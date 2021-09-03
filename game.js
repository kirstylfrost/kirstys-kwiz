const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

//Questions
let questions = [{
        question: "How many permanent teeth does a dog have?",
        choice1: "32",
        choice2: "24",
        choice3: "42",
        choice4: "36",
        answer: 3,
    },
    {
        question: "What is the most sold flavour of Walker's crisps?",
        choice1: "Cheese & Onion",
        choice2: "Salt & Vinegar",
        choice3: "Prawn Cocktail",
        choice4: "Ready Salted",
        answer: 1,
    },
    {
        question: "What is someone who believes in antidisestablishmentarianism opposed to the disestablishment of?",
        choice1: "The Government",
        choice2: "The Church of England",
        choice3: "Political Party System",
        choice4: "Cats and Dogs",
        answer: 2,
    },
    {
        question: "How many chukkers are there in a polo match?",
        choice1: "2",
        choice2: "8",
        choice3: "4",
        choice4: "6",
        answer: 4,
    },
    {
        question: "On average how far away is the moon from the earth in miles?",
        choice1: "236,000",
        choice2: "238,000",
        choice3: "240,000",
        choice4: "242,000",
        answer: 2,
    },
    {
        question: "Saying the name of what dried fruit used to be used to encourage people to smile before a photo in the 1800s, before the phrase 'cheese'?",
        choice1: "Prunes",
        choice2: "Apricots",
        choice3: "Sultanas",
        choice4: "Lemons",
        answer: 1,
    },
    {
        question: "Which country in the world is believed to have the most miles of motorway?",
        choice1: "China",
        choice2: "USA",
        choice3: "South Africa",
        choice4: "Australia",
        answer: 1,
    },
    {
        question: "Who won 2019's Sports Personality of the Year?",
        choice1: "Andy Murray",
        choice2: "Geraint Thomas",
        choice3: "Ben Stokes",
        choice4: "Mo Farrah",
        answer: 3,
    },
    {
        question: "Who is the longest serving presenter of the BBC children's show Blue Peter?",
        choice1: "Valerie Singleton",
        choice2: "Konnie Huq",
        choice3: "Peter Purves",
        choice4: "John Noakes",
        answer: 4,
    },
    {
        question: "Which 2019 film won the Golden Raspberry Aware for Worst Film this year?",
        choice1: "Hell Boy",
        choice2: "Cats",
        choice3: "A Madea Family Funeral",
        choice4: "Ugly Dolls",
        answer: 2,
    },
];

//Constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

//Start of game, add to counter and move to next question
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
      //go to the end page
      return window.location.assign("/end.html");
    }
    //Tally score
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
  
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    //Question selected - code to avoid duplication of selection
    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

//Display feedback for correct and incorrect answers - red & green    
choices.forEach(choice => {
    choice.addEventListener("click", e => {
      if (!acceptingAnswers) return;
  
      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset["number"];
  
      const classToApply =
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
  
      if (classToApply === "correct") {
        incrementScore(CORRECT_BONUS);
      }
  
        /*Creates a delay between current and next question when user has selected an answer*/ 
        selectedChoice.parentElement.classList.add(classToApply);
  
        setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
      }, 1000);
    });
  });

  /*HUD - Increment score as correct answers selected*/ 
  incrementScore = num => {
      score += num;
      scoreText.innerText = score
  }
  
  startGame();