class Quiz {
    constructor(){
        this.startBtn = document.getElementById('startBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.main = document.getElementById('mainContainer');
        this.introContainer = document.getElementById('introContainer');

        
        
        this.startQuiz()

        
    }
 startQuiz(){
      startBtn.addEventListener("click",e=>{

        this.startBtn.classList.add("hide")
        this.nextBtn.classList.remove("hide")
        this.main.classList.remove("hide")
        this.introContainer.classList.add("hide")
              
        let question = new AllQuestions;




            //  question.getQuestions()
          })
 }

//  endQuiz()
 


}