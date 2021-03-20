

const questionNumber=document.querySelector(".question-number");
const questionText=document.querySelector(".question-text");
const optionContainer=document.querySelector(".option-container");
const answersIndicatorContainer=document.querySelector(".answers-indicators");
const homeBox=document.querySelector(".home-box");
const quizBox=document.querySelector(".quiz-box");
const resultBox=document.querySelector(".result-box");



let questionCounter=0;
let currentQuestions;
let availableQuestions=[];
let availableOptions=[];
let correctAnswers=0;
let attempt=0;




//push the question into available question array
function setAvailableQuestions()
{
    const totalQuestions=quiz.length;
    for(let i=0;i<totalQuestions;i++)
    {
        availableQuestions.push(quiz[i])
    }


}



//set question number and question and option
function getNewQuestion(){
//set question number
questionNumber.innerHTML="Question  " + (questionCounter + 1) + " of " + quiz.length;

//set question text set random questions
const questionIndex=availableQuestions[Math.floor(Math.random() *availableQuestions.length)];
currentQuestions=questionIndex;
questionText.innerHTML=currentQuestions.q;
//get the position of questionIndex from availableQuestion array
const index1=availableQuestions.indexOf(questionIndex);
//console.log(index1);
//console.log(questionIndex);
//remove the question index from availableQuestion array so that the question does not repeat
availableQuestions.splice(index1,1);
//console.log(questionIndex)
//console.log(availableQuestions)
//set options
//get thelength of options
const optionLen=currentQuestions.options.length;
//push options in available option array
for(let i=0;i<optionLen;i++)
{
    availableOptions.push(i)

}
optionContainer.innerHTML='';
let animationDelay=0.15 ;
//create option in HTML
for(let i=0;i<optionLen;i++)
{
    //random option
    const optionIndex=availableOptions[Math.floor(Math.random()* availableOptions.length)];
    //get the position of optionindex from availableoption array
    const index2=availableOptions.indexOf(optionIndex);
    //remove the optionindex from availableoption array, so that option does not repeat
    availableOptions.splice(index2,1);
    //console.log(optionIndex);
    //console.log(availableOptions);
    const option=document.createElement("div");
    option.innerHTML=currentQuestions.options[optionIndex];
    option.id=optionIndex;
    option.style.animationDelay=animationDelay + 's';
    animationDelay=animationDelay + 0.15;
    option.className="option ";
    
    optionContainer.appendChild(option);
    option.setAttribute("onclick","getResult(this)")
    
}

questionCounter++;


}



//function getresult of current attemted question
function getResult(element){
    const id=parseInt(element.id);
    console.log(typeof id);
    //get the answers by compairing the id of clicked option
    if(id === currentQuestions.answer){
        //set the green color to correct option
        
    element.classList.add("correct")
    console.log("answer is correct");
    updateAnswersIndicators("correct");
    correctAnswers++;
    
    
    }
    else{
        element.classList.add("wrong");
        console.log("answer is wrong");
        updateAnswersIndicators("wrong");
        
        //if the answer is incorrect show the correct option by adding green color to correct option
        const optionLen=optionContainer.children.length;
        for(let i=0;i<optionLen;i++)
        {
            if(parseInt(optionContainer.children[i].id)===currentQuestions.answer){
                optionContainer.children[i].classList.add("correct");
            }
        }
        
       
    }
    attempt++;
    unClickableOption();

}
//function to restrict the user to change the answer
function unClickableOption(){
    const optionLen=optionContainer.children.length;
    for(let i=0;i<optionLen;i++)
    {
        optionContainer.children[i].classList.add("alreadyanswered")

    }
}

function answersIndicator(){
    const totalQuestions=quiz.length;
    for(let i=0;i<totalQuestions;i++)
    {
        const indicator=document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }
}


function updateAnswersIndicators(markType){

    answersIndicatorContainer.children[questionCounter-1].classList.add(markType);
}


function next(){
    if(questionCounter === quiz.length){
        console.log("Quiz over!")
        quizOver();
    }
    else{
        getNewQuestion();
    }
}

function quizOver(){
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
    quizResult();

}
//get the result of quiz
function quizResult()
{
    resultBox.querySelector(".total-question").innerHTML=quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML=attempt;
    resultBox.querySelector(".total-correct").innerHTML=correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML=attempt-correctAnswers;
    const percent=(correctAnswers/quiz.length)*100;
    resultBox.querySelector(".percentage").innerHTML=percent.toFixed() + "%";
    resultBox.querySelector(".total-score").innerHTML=correctAnswers +"/"+quiz.length;
}

function resetQuiz(){
    questionCounter=0;
    correctAnswers=0;
    attempt=0;
}
function tryAgainQuiz(){
    //hide the result box
    resultBox.classList.add("hide");
    //show the quiz box
    quizBox.classList.remove("hide");

    resetQuiz();

}

function goToHome(){
    //hide resultbox
    resultBox.classList.add("hide");
    //how homebox
    homeBox.classList.remove("hide");
    resetQuiz();
}


///######ENTRY POINT OF THE QUIZ
function startQuiz(){
//hide home box
homeBox.classList.add("hide");
//show quiz box
quizBox.classList.remove("hide");
//this call will set all the questions in available quetion array
    setAvailableQuestions();
//this will call getNew Question()
    getNewQuestion();
//answersinsicators
answersIndicator();
   
}