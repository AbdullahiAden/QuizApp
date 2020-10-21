document.addEventListener("DOMContentLoaded", function (e) {
  // https://quizapi.io/api/v1/questions?apiKey=mK0SPtcOzyhQODarlNLDzoZOUogQMh5IenMC945k&category=code&difficulty=Easy&limit=10
  fetch("question.json")
    .then(response => response.json())
    .then(data => {
      let game = new Quiz(data);
      // console.log(data);
    })
})


class Quiz {
  constructor(fetchedQuestions) {
    this.loadedQuestions = []
    this.questionCounter = 0;
    this.maxQuestions = 10

    this.selectedAnswers = []
    this.correctAnswerChoices = []
    this.score = 0
    console.log(fetchedQuestions);

    for (let fetchedQuestion of fetchedQuestions) {
      this.loadedQuestions.push(new Question(fetchedQuestion))
    }
    // contains an object created from the Question class which holds all the json objects from the api 
    console.log(this.loadedQuestions);
    this.startQuiz()
  }

  startQuiz() {
    // this.questionCounter++
    let startBtn = document.getElementById('startBtn');
    startBtn.addEventListener("click", e => {
      startBtn.classList.add("hide")

      let mainContainer = document.getElementById('mainContainer');
      let nextBtn = document.getElementById('nextBtn');
      mainContainer.classList.remove("hide")
      nextBtn.classList.remove("hide")
      let intro = document.getElementById('introContainer');
      intro.classList.add("hide")


      this.displayCurrentQuestion()
      this.questionCounter++
    })
    this.nextButton()

  }
  displayCurrentQuestion() {
    let questionDisplay = document.getElementById('questionDisplay');
    questionDisplay.innerText = this.loadedQuestions[this.questionCounter].question
    this.displayCurrentAnswers()
  }

  displayCurrentAnswers() {
    // answers with null
    // console.log(this.loadedQuestions[this.questionCounter].answers);
    let toBeFiltered = Object.values(this.loadedQuestions[this.questionCounter].answers)
    // console.log(this.correct_answers);
    // gives array without null
    // *** push filtered ans into arr
    let filteredAnswerChoices = toBeFiltered.filter(unfilteredAnswers => unfilteredAnswers !== null)
    // console.log(filteredAnswerChoices.length);
    for (let i = 0; i < filteredAnswerChoices.length; i++) {
      let answerContainer = document.getElementById('answerContainer');
      let answerDiv = document.createElement("p")

      answerDiv.classList.add("divAnswers")
      answerDiv.innerText = filteredAnswerChoices[i]
      answerContainer.appendChild(answerDiv)

      answerDiv.addEventListener("click", e => {
        if (answerDiv.classList.contains("clicked")) {
          answerDiv.classList.remove("clicked")
        } else {
          answerDiv.classList.add("clicked")
        }

      })

    }
    this.correctTheQuestion()
  }

  correctTheQuestion() {
    let correctAnswers = Object.values(this.loadedQuestions[this.questionCounter].correct_answers)
    let answerChoices = this.loadedQuestions[this.questionCounter].answers

    let userIndex = []
    console.log(correctAnswers);
    console.log(answerChoices);

    let userAnswers = Array.from(document.querySelectorAll('.divAnswers'))
    // let checkedAns = Array.from(document.getElementsByClassName('checkbox'))

    // loop thorugh answer choices, get the index that was clicked, 
    // get the index of true in corrrect answer choices, compare it with clicked, if match increment score 
    userAnswers.forEach(check => {
      check.addEventListener('click', e => {
        if(check.classList.contains("clicked")){
            userIndex.push(Array.from(userAnswers).indexOf(e.target))
        console.log(userIndex);

        let trueIndex = [correctAnswers.indexOf("true")]
        console.log(trueIndex);
        // *** if user clicks correct one more than once it increments the score , also increments clicking wrong one after clicking  correct one 
        // ** also cannot get score clicking the correct one after clicked wrong the first time
        // ** make sure to check if more than one answer can be chosen...........
        for (var i = 0; i < trueIndex.length; i++) {
          if (userIndex[i] !== trueIndex[i])  { 

           this.score=0;
          console.log("score is 0");
          } else {

            this.score++
            console.log('scored 1');
          }
        }

        } else{
          // *** can click wrong and click right and get point 
          userIndex= [ ]
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
        intro.innerText = "GAME OVER! Your Score is " + this.score

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

  }

}