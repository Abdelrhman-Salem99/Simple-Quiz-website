import { Quiz } from './quiz.js';


export class Setting{
    constructor(){
        this.categoryElements=$("#category");
        this.difficultyElements=$('input[name="difficulty"]');
        this.numberElements=$("#Number");


        this.startBtn=$("#startBtn");

        this.startBtn.click(()=>{
            this.StartQuiz();
        })
           
       
    }
 
   async StartQuiz(){
        let category=this.categoryElements.val();
        let number=this.numberElements.val();
         let difficulty=[...this.difficultyElements].filter(element => element.checked);
        let url=`https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${difficulty[0].value}&type=multiple`;
        
       let results =await this.fetchUrl(url);

       new Quiz(results,number);


        $("#setting").fadeOut(700,()=>{
            $("#quiz").fadeIn(700)
        });
    }


   async fetchUrl(url){
        let res= await fetch(url);
        let data=await res.json();
        return data.results;
    }
    
}