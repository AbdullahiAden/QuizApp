let choices = Array.from (document.getElementsByClassName("choice-text"));
// console.log(choices);
let currentQuestion = {}
let acceptingAnswers=false
let score =0
let questionCounter=0
let availableQuestions=[]

let questions = [];


class Quiz{
    constructor(questions, amount){

    }

}
let maxQuestions=3

class UI{

    
    // method: startGáme()
    static startGame(){
        questionCounter=0
        score=0
        // availableQuestions=[questions]
        availableQuestions=[...questions]
        // console.log(availableQuestions);

        // method get new question called
       UI.getNewQuestion()


    }
// get new questions 
    static getNewQuestion(){

        // if(availableQuestions===0  ||questionCounter >= maxQuestions){
        //     return window.location.assign("/app.js")
        // }


        questionCounter++;
        // get random questions form the array
    //    console.log(availableQuestions);

       let questionIndex= Math.floor(Math.random()*availableQuestions.length);
       currentQuestion= availableQuestions[questionIndex];
    //    console.log(questionDisplay);
    //    display the cureent from the question we just loaded and its question proper which is in the array
       questionDisplay.innerText = currentQuestion.question

       choices.forEach(choice => {
        //    dataset  is where you add custom properties, 
        // anything is prefixed with data will become property on that node
        // log choices to see 

        
        // accessing the data - number in html file
           let number = choice.dataset['number']
           // using the data attribute number associated with the choice elemt to get the appropiate choice out of the current question 
           choice.innerText = currentQuestion["choice" + number];
        //    splice out the question we just used
        availableQuestions.splice(questionIndex, 1)

        acceptingAnswers=true

       })
       choices.forEach(choice=>{
            choice.addEventListener("click", e=> {
                // just ignore there click if not accepting answers
                if(!acceptingAnswers)return

                acceptingAnswers=false;
                let selectedChoice=e.target;
                let selectedAnswer= selectedChoice.dataset["number"]
                console.log(selectedAnswer);

                UI.getNewQuestion()

       } )
       })
      
    }

}

fetch('https://quizapi.io/api/v1/questions?apiKey=xvknNdxOU2yLmiWBsYmtfx4HkJkGHKciGkCORW69&difficulty=Easy&limit=3')
 .then(res=>{
     return res.json();

 })
 .then(loadedQuestions=>{
     console.log(loadedQuestions);
 })

// convert the questions we get from api to new format so we can use map()
loadedQuestions.map(loadedQuestion=>{
    // format each indibidual question in api 
    let formattedQuestion={
        question: loadedQuestion.questions
    };
    let ansChoices=[...loadedQuestion.incorrect-answers];
    formattedQuestion.answer=Math.floor(Math.random()*3+1);
    ansChoices.splice(
        formattedQuestion.answer -1, 0, loadedQuestion.correct-answer
    );
    ansChoices.forEach((choice, index) =>{
        formattedQuestion["choice" + (index+1)]=choice;

    });
    return formattedQuestion;
})
startGame()
