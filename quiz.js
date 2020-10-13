document.addEventListener("DOMContentLoaded", function(e){

  fetch("https://quizapi.io/api/v1/questions?apiKey=mK0SPtcOzyhQODarlNLDzoZOUogQMh5IenMC945k&category=code&difficulty=Easy&limit=3")
  .then(response => response.json())
  .then(data => {
    let game = new Quiz(data);
    console.log(data);
  })  
})


class Quiz {
  constructor(fetchedQuestions){
    this.loadedQuestions=[]
    this.questionCounter=0;
    this.maxQuestions=10

    this.filteredAnswerChoices=[]
// ***going to hold the users clicked answers to be later compared to the correct answers array
    this.selectedAnswers=[]


// *** contains an object created from the Question class which holds all the json objects from the api 
    console.log(this.loadedQuestions);

    for (let fetchedQuestion of fetchedQuestions ){
      this.loadedQuestions.push(new Question(fetchedQuestion))
    }

    console.log(this.loadedQuestions[this.questionCounter].question);
    this.startQuiz()
    // this.nextButton()
  }

  startQuiz(){


    this.displayQuiz()

    let mainContainer = document.getElementById('mainContainer');
    mainContainer.classList.remove("hide")

    
    // this.loadedQuestions[this.questionCounter].displayCurrentAnswers()


    this.nextButton()

  }
  nextButton(){
    // *** load next question each with its answers everytime its clicked
    this.maxQuestions=0

        this.questionCounter++
        console.log(this.questionCounter);


    let nextBtn = document.getElementById('nextBtn');
    nextBtn.addEventListener("click", function(e){

      

      console.log(e.target);

      // if(this.questionCounter>=this.maxQuestions){
      //  console.log('game over');
      // }
      // this.endGame()
    })
  }

  displayQuiz(){
    // ***************************************
    if(this.endQuiz()){
      console.log('endddd');
    }
    let questionDisplay = document.getElementById('questionDisplay');
    // *** using 
    questionDisplay.innerText=this.loadedQuestions[this.questionCounter].question
// gives array without null
    console.log(this.filteredAnswerChoices);
  
//  WE ARE FILTERING THIS.ANSWER FROM THE QUESTION CLASS, IN ORDER TO ACCESS THAT, WE USE LOADEDQUES...  
// WITH AN ATTRIBUTE OF THIS CLASS THEN PUSH TO AN ARRAY IN THIS CLASS
  this.filteredAnswerChoices.push(this.loadedQuestions[this.questionCounter].answers.filter(unfilteredAnswers => unfilteredAnswers !== null))
  console.log(this.filteredAnswerChoices.length);

  // **** TODO: MAKE SURE TO GET THE ANSWERS IN OWN LINE???????????????????????????????????????????
    for (let i = 0; i<this.filteredAnswerChoices.length;i++){
      let answerContainer = document.getElementById('answerContainer');

      let answerCheckbox = document.createElement("input")
      answerCheckbox.type="checkbox"
      answerCheckbox.classList.add("checkbox")
      let answerLabel=document.createTextNode(this.filteredAnswerChoices[i])
      answerContainer.appendChild(answerCheckbox)
      answerContainer.appendChild(answerLabel)


      answerCheckbox.addEventListener("click", e =>{
        if(e.target.checked){

          let userChoice=this.selectedAnswers.push(e.target)
          console.log(this.selectedAnswers);

          console.log('is chekced');
// **** TODO: get the value of the clcked checbox----------------------------
          return userChoice
        }

        // console.log(e.target);


        // **** give the correct answer as the one of the choices, and give it id to
        // **** check if clicked answer is correct

      })
    }

    // answerChoices.innerText=
    // this.nextButton()
  }

  endQuiz(){
    // return window.location.assign()

  }
  
}
class Question{
  constructor(question){
      this.question =question.question
      this.answers =Object.values (question.answers ) 
      this.correct_answers =question.correct_answers

  

      // console.log(this.answers);
      // console.log(this.question);
      // console.log(this.correct_answers);


      // this.displayCurrentQuestion()
  }      

  
}      





// class Quiz {
//   constructor(){
//       this.startBtn = document.getElementById('startBtn');
//       this.nextBtn = document.getElementById('nextBtn');
//       this.main = document.getElementById('mainContainer');
//       this.introContainer = document.getElementById('introContainer');

      
      
//       this.startQuiz()

      
//   }
// startQuiz(){
//     startBtn.addEventListener("click",e=>{

//       this.startBtn.classList.add("hide")
//       this.nextBtn.classList.remove("hide")
//       this.main.classList.remove("hide")
//       this.introContainer.classList.add("hide")
            
//       let question = new AllQuestions;


//           //  question.getQuestions()
//         })
// }

// //  endQuiz()



// }