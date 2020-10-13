document.addEventListener("DOMContentLoaded", function(e){

  fetch("https://quizapi.io/api/v1/questions?apiKey=mK0SPtcOzyhQODarlNLDzoZOUogQMh5IenMC945k&category=code&difficulty=Easy&limit=5")
  .then(response => response.json())
  .then(data => {
    let game = new Quiz(data);
    // console.log(data);
  })  
})


class Quiz {
  constructor(fetchedQuestions){
    this.loadedQuestions=[]
    this.questionCounter=0;
    this.maxQuestions=5

    this.score;

// *** contains an object created from the Question class which holds all the json objects from the api 
    console.log(this.loadedQuestions);

    for (let fetchedQuestion of fetchedQuestions ){
      this.loadedQuestions.push(new Question(fetchedQuestion))
    }
    console.log(this.loadedQuestions);

    // this.loadedQuestions[this.questionCounter].displayCurrentQuestion()
    // this.nextButton()
    this.startQuiz()
      // this.loadedQuestions[this.questionCounter].displayCurrentAnswers()


    // console.log(this.loadedQuestions);
    // this.nextButton()
    // this.nextButton()
  }

  startQuiz(){
    // this.questionCounter++
    // if(this.endQuiz){

    // }
    let startBtn = document.getElementById('startBtn');
    startBtn.addEventListener("click",e=>{
      startBtn.classList.add("hide")
      
 let mainContainer = document.getElementById('mainContainer');
    mainContainer.classList.remove("hide")

      this.loadedQuestions[this.questionCounter].displayCurrentQuestion()
    })
    this.nextButton()

  }
  nextButton(){
    
    let nextBtn = document.getElementById('nextBtn');
 
    // *** load next question each with its answers everytime its clicked
        // this.questionCounter++
        // console.log(this.questionCounter);
        // console.log(this.questionCounter);
        // console.log(this.loadedQuestions);
    nextBtn.addEventListener("click", e=>{
    

      // ************** empty the question and answers
      let questionDisplay = document.getElementById('questionDisplay');
      questionDisplay.innerText=""

      let answerContainer = document.getElementById('answerContainer');
      answerContainer.innerText=""
      this.questionCounter ++
      this.loadedQuestions[this.questionCounter].displayCurrentQuestion()

      // this.questionCounter++
      // console.log(e.target);
     console.log(this.maxQuestions);
     console.log(this.questionCounter);

     

      // if (this.questionCounter===this.maxQuestions){
      //   // show score
      //   console.log("enddd");
      // } 

      this.endQuiz()
    })
    

  }

  endQuiz(){

     if(this.questionCounter===this.maxQuestions){
       console.log('game over');
      console.log(this.questionCounter); 
      console.log(this.maxQuestions); 

      let intro = document.getElementById('introContainer');
      intro.innerText="GAME OVER"

      let questionDisplay = document.getElementById('questionDisplay');
      let answerContainer = document.getElementById('answerCOntainer');
      questionDisplay.classList.add("hide")
      answerContainer.classList.add("hide")
      
      // location.reload()
      }
    // show score 

  }
  
}
class Question{
  constructor(question){
      this.question =question.question
      this.answers =Object.values (question.answers ) 
      this.correct_answers =question.correct_answers

  
      this.selectedAnswers=[]

      // console.log(this.answers);
      // console.log(this.question);
      // console.log(this.correct_answers);


      // this.displayCurrentQuestion()
  }      

  displayCurrentQuestion(){

    // ******** TODO: kolla om det är endQuiz, om inte kör frågor och svar 
    // ******** problem??? calling that method in Quiz

    let questionDisplay = document.getElementById('questionDisplay');
    questionDisplay.innerText=this.question

    // this.displayCurrentAnswers()
    this.displayCurrentAnswers()

  }

  displayCurrentAnswers(){
    // answers with null
    console.log(this.answers);
  // gives array without null
// *** push filtered ans into arr
  let filteredAnswerChoices =this.answers.filter(unfilteredAnswers => unfilteredAnswers !== null)
  console.log(filteredAnswerChoices.length);

    for (let i = 0; i<filteredAnswerChoices.length;i++){
      let answerContainer = document.getElementById('answerContainer');

      let answerCheckbox = document.createElement("input")
      answerCheckbox.type="checkbox"
      answerCheckbox.classList.add("checkbox")
      let answerLabel=document.createTextNode(filteredAnswerChoices[i])
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