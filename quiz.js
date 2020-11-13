document.addEventListener("DOMContentLoaded", function (e) {
  // used for debugging 
  // question.json 
  fetch("https://quizapi.io/api/v1/questions?apiKey=mK0SPtcOzyhQODarlNLDzoZOUogQMh5IenMC945k&category=code&difficulty=Easy&limit=10")
    .then(response => response.json())
    .then(data => {
      let game = new Quiz(data);
      // console.log(data);
    })
})

class Quiz {
  constructor(fetchedQuestions) {

    this.playerName;
    this.loadedQuestions = []
    this.questionCounter = 0;
    this.maxQuestions = 10

    
    this.score = 0

    for (let fetchedQuestion of fetchedQuestions) {
      this.loadedQuestions.push(new Question(fetchedQuestion))
    }
    // contains an object created from the Question class which holds all the json objects from the api 
    console.log(this.loadedQuestions);

    this.startQuiz()
  }

  startQuiz() {
    let startBtn = document.getElementById('startBtn');
    startBtn.addEventListener("click", e => {
      startBtn.classList.add("hide")

      let mainContainer = document.getElementById('mainContainer');
      let nextBtn = document.getElementById('nextBtn');
      mainContainer.classList.remove("hide")
      nextBtn.classList.remove("hide")
      let intro = document.getElementById('introContainer');
      intro.classList.add("hide")

      this.playerName = document.getElementById('playerInput').value;
      console.log(this.playerName);
      this.displayCurrentQuestion()
      // increment counter 
      this.questionCounter++
    })

    // method call 
    this.nextButton()

  }
  displayCurrentQuestion() {
    let questionDisplay = document.getElementById('questionDisplay');
    // displays question 1, counter starts 1 here
    questionDisplay.innerText = this.loadedQuestions[this.questionCounter].question

    // method call 
    this.displayCurrentAnswers()
  }

  displayCurrentAnswers() {
    // answers with null
    // console.log(this.loadedQuestions[this.questionCounter].answers);
    let toBeFiltered = Object.values(this.loadedQuestions[this.questionCounter].answers)

    // gives array without null, cause null has been filtered out
    let filteredAnswerChoices = toBeFiltered.filter(unfilteredAnswers => unfilteredAnswers !== null)
    // console.log(filteredAnswerChoices.length);

    // loop through answers and create p tag for each answer and append to the answerContainer
    for (let i = 0; i < filteredAnswerChoices.length; i++) {
      let answerContainer = document.getElementById('answerContainer');
      let answerDiv = document.createElement("p")

      answerDiv.classList.add("divAnswers")
      // displays each answer in its own p tag
      answerDiv.innerText = filteredAnswerChoices[i]
      answerContainer.appendChild(answerDiv)

      // giving style for the clicked answer
      answerDiv.addEventListener("click", e => {
        if (answerDiv.classList.contains("clicked")) {
          answerDiv.classList.remove("clicked")
        } else {
          answerDiv.classList.add("clicked")
        }

      })

    }
    // method call 
    this.correctTheQuestion()
  }

  correctTheQuestion() {
    let correctAnswers = Object.values(this.loadedQuestions[this.questionCounter].correct_answers)
    let multiple_correct_answers = this.loadedQuestions[this.questionCounter].multiple_correct_answers
    // let answerChoices = this.loadedQuestions[this.questionCounter].answers

    

    // console.log(multiple_correct_answers);
    // console.log(correctAnswers);
    // console.log(answerChoices);
    let userIndex = []
    let trueIndexes = []

    // loop through the correct answers array and push the indexes that hold 
      // the keyword "true" into trueIndexes array, to be later compared with users answers

    let i = -1;
    while ((i = correctAnswers.indexOf("true", i + 1)) != -1) {
      trueIndexes.push(i)
    }
    console.log(trueIndexes);

    // make array from the divanswers that were created 
    let userAnswers = Array.from(document.querySelectorAll('.divAnswers'))

    // loop through the answers, push the clicked div in userIndex array , 
      // then compare that with trueIndexes which holds the correct answer indexes, then match them
    userAnswers.forEach(check => {
      check.addEventListener('click', e => {
        if (check.classList.contains("clicked")) {
          userIndex.push(Array.from(userAnswers).indexOf(e.target))
          console.log(userIndex);

        } else {
          // means is not clicked, so empty
          userIndex = []

        }

        // check multiple answer
        if (multiple_correct_answers === "true") {
          console.log('multi true');
          // if each value in trueIndexes is found in userIndex and the length is same. increment score. order don't matter
          if (trueIndexes.every((val) => userIndex.includes(val) && trueIndexes.length === userIndex.length)) {
            this.score++;
            // console.log("score is 1");
            console.log(this.score);

          }
          // check multiple that is shown "false" in multiple_correct_answers in the API data. 
        } else if (multiple_correct_answers === "false" && trueIndexes.length > 1) {

          if (trueIndexes.every((val) => userIndex.includes(val)) && trueIndexes.length === userIndex.length) {
            this.score++
            console.log('multi false');
            console.log(this.score);

          }
        }
        // check for single answer
        else if (multiple_correct_answers === "false" && trueIndexes.length <= 1) {
          // if each value in trueIndexes is found in userIndex and the length is same. increment score.
          if (trueIndexes.every((val) => userIndex.includes(val)) && trueIndexes.length === userIndex.length) {

            this.score++;
            // console.log("scored1");
            console.log(this.score);
          } else {
            // ** when chosen correct ans, and click with wrong, it give point
            // console.log('scored 0');
            console.log(this.score);
          }

        }
      });

    })
  }

  nextButton() {

    let nextBtn = document.getElementById('nextBtn');
    let questionNr = document.getElementById('questionNr');
    let intro = document.getElementById('introContainer');

    nextBtn.addEventListener("click", e => {

      if (this.questionCounter >= this.maxQuestions) {

        let replay = document.getElementById('replay');
        replay.classList.remove("hide")

        console.log("endd");
        let nextBtn = document.getElementById('nextBtn');
        nextBtn.classList.add("hide")
        let questionContainer = document.getElementById('questionContainer');
        questionContainer.classList.add("hide")

        intro.classList.remove("hide")
        let gameOver = document.createElement("h3")

        gameOver.innerHTML = " GAME OVER! " + "-- " + this.playerName


        intro.innerText = "Your Score is : " + this.score
        intro.appendChild(gameOver)

        this.rePlay()

      }
      // empty the question and answers
      let questionDisplay = document.getElementById('questionDisplay');
      questionDisplay.innerText = ""

      let answerContainer = document.getElementById('answerContainer');
      answerContainer.innerText = ""
      // increment the count to print question and answers
      this.displayCurrentQuestion()
      this.questionCounter++

      questionNr.innerText = this.questionCounter
    })


  }

  rePlay() {
    let replay = document.getElementById('replay');
    replay.addEventListener("click", e => {
      location.reload()

    })

  }

}
class Question {
  constructor(question) {
    this.question = question.question
    this.answers = question.answers
    this.correct_answers = question.correct_answers
    this.multiple_correct_answers = question.multiple_correct_answers

  }

}