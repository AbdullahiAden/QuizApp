document.addEventListener("DOMContentLoaded", function(e){
    
    startBtn = document.getElementById('startBtn');
    nextBtn = document.getElementById('nextBtn');
    startBtn.addEventListener("click", e=>{
    let quiz = new Quiz()
    
    })

       
    })
class Question{
    constructor( id, question, answers, correct_answers){
    //     this.question= question.question
    // this.id= question.id
    // this.answer= question.answers
    // this.correct_answer= question.correct_answers
        this.id = id       
        this.question =question
        this.answers =answers  
        this.correct_answers =correct_answers

// ***** keep track of the objects created of this Question class
        this.trackedQuestionObjects=[]
        this.trackedAnswerObjects=[]

        this.trackedQuestionObjects.push(this)
        this.trackedAnswerObjects.push(this.answers, this.correct_answers)

        // console.log(this.trackedQuestionObjects);
        // this.showQuestionAndAnswers()
        this.renderAnswers()
    // this.answer=answer;
    // this.description=description;
    }
    renderAnswers(){
    //**** filter out null answers
    this.trackedAnswerObjects.filter(el=>{
        for(let property in el){
            if (el [property]==null){
            delete el[property]
        }else if(el[property]==="false"){
            delete el[property]
        }
        }
        return el ;
    })
// answers without null 
console.log(this.trackedAnswerObjects);     

// **** LOOOP THROUGH TRACQUEST....

// *** loop through trackedAnswerO... and send each property 
this.trackedQuestionObjects.forEach(currentAnswers => {
    let answerContainer = document.getElementById('answerContainer');
    let br = document.createElement("br")
    for(let answer in currentAnswers){
        let ansDiv = document.createElement("div")
        let ansPar = document.createElement("p")
        
        ansPar.innerText=[currentAnswers]
        ansPar.appendChild(ansDiv)
    }
    answerContainer.innerHTML =Object.entries(currentAnswers.answers)
    console.log(currentAnswers.answers);
});
    //  answerContainer.innerHTML="hhh"
        this.showQuestionAndAnswers()
    } 
showQuestionAndAnswers(){
    let questionDisplay = document.getElementById('questionDisplay');   
    // console.log(filteredAnswers);
    // *** loop through trackedQu...
    
    this.trackedQuestionObjects.forEach(currentQuestion=>{
        questionDisplay.innerHTML=currentQuestion.question
        // answerContainer.innerHTML=currentQuestion.answers
        // console.log (currentQuestion.question)
        // let currentAnswers=Object.entries( currentQuestion.answer, currentQuestion.correct_answer)
        // console.log(currentAnswers);
        
    })
    // this.nextQuestion()
}

nextQuestion(){
    nextBtn.addEventListener("click", e=>{
        // console.log(this.trackedQuestionObjects.filteredAnswers);
        this.showQuestionAndAnswers()
        console.log('clikc');
    
    })

}

     
}

class AllQuestions{
    constructor(questions){
        // this.questions=questions
        this.questionCounter=0;     
        this.numberOfQuestions=0 // to be displayed for the user

        this.fetchedQuestionsArray=[]
        for (let i=0; i <this.fetchedQuestionsArray.length;i++){
            
            console.log(this.fetchedQuestionsArray[i]);
        }
        
        this.fetchQuestions()
    }
    fetchQuestions(){
        // fetch questions
        let url='https://quizapi.io/api/v1/questions?apiKey=xvknNdxOU2yLmiWBsYmtfx4HkJkGHKciGkCORW69&difficulty=Easy&limit=3'
        fetch(url)
        .then(response => response.json())
        .then(data =>{
            // console.log(data);
// loopa genom datan from api----------------------------  
            data.forEach( availableQuestions => {
                // console.log(availableQuestions);
                this.fetchedQuestionsArray.push(new Question(availableQuestions.id,availableQuestions.question, availableQuestions.answers, availableQuestions.correct_answers ))
                // console.log( this.fetchedQuestionsArray.keys())              
// loop through the fetchedQuestionsArray which hold each question as object of the Question
             });
                // console.log(this.fetchedQuestionsArray);
                // this.fetchedQuestionsArray.push(new )
        });
        // this.formatQuestion()
        
    }

     formatQuestion(){
      forEach(function(fQ){
        let qA=this.fetchedQuestionsArray.keys(fq)


         console.log("in formatQ");
         console.log(fQ);
     })
        this.showQuestionAndAnswers()
    }

  


   



}