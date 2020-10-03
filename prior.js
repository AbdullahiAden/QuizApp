class Player{
    constructor(playerName, playerScore){
        this.name=name
        this.score=score;

    }

}

class UI {

    static startGame(){
        let currentQuestion=0;
        let questionCounter=0

    }

    

    static showQuestion(){
        let questionDisplay = document.getElementById('questionDisplay');
        questionDisplay.innerHTML= questions;
    }

    static nextQuestion(){
        questionCounter++;
    }

}

class QuestionSet{
    constructor (questionsArr){
        this.questionsArr=[];
         for (let question of questionsArr) {
        // pushing new object of Question Class into array which holds the 
        //question from the  
          this.questionsArr.push(new Question(question));
    
        } 
    }

     getQuestion(){
         console.log(this.questionsArr);
         
        // let questionArr=[]

        // console.log(quesionsArr);        

        // spread the questions array and put it variable called availableQuestion
        // let availableQuestions = [...questions]
        let questionDisplay = document.getElementById('questionDisplay');

        // questions.map()
        // console.log(questionsArr);
        // questionIndex= Math.floor(Math.random()*questions)
    }

   
}

class Question{
    constructor(question){
        this.id= question.id 
        this.question = question.question;
        this.answers=question.answers;

    }
    
   
    //    method checkCorrectAnswer
        // must have two par , check krav
    //  checkCorrectAnswer(){
        
    //     questions.forEach(choice=>{

    //     })

    // }

    }

document.addEventListener("DOMContentLoaded", function(e){

    fetch("https://quizapi.io/api/v1/questions?apiKey=xvknNdxOU2yLmiWBsYmtfx4HkJkGHKciGkCORW69&difficulty=Easy&limit=3")
    .then(response => response.json())
    .then(data => {
    // creating new object from the questionSet Class which holds
    // the data from fetch and then puting in variable   
    let questions = new QuestionSet(data);
    questions.getQuestion();

    // console.log(questions) 

    })