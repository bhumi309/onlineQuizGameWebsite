

const questionNumber=document.querySelector(".question-number");
const questionText=document.querySelector(".question-text");
const optionContainer=document.querySelector(".option-container");

let questioncounter=0;
let currentQuestions;
let availableQuestions=[];
let availableOptions=[];

//push the question into available question array
function setAvailableQuestions(){
    const totalQuestions=quiz.length;
    for(let i=0;i<totalQuestions;i++){

    
    availableQuestions.push(quiz[i])
    }

}

//getNewQuestion() function

function getNewQuestion(){
//set question number
questionNumber.innerHTML="Question  " + (questioncounter + 1) + " of " + quiz.length;

//set question text
//get random question

const questionIndex=availableQuestions[Math.floor(Math.random() *availableQuestions.length)];
currentQuestions=questionIndex;
questionText.innerHTML=currentQuestions.q;
//get the position of questionindex() from available question array
const index1=availableQuestions.indexOf(questionIndex);
//remove question index from available question array so that question does not repeat
availableQuestions.splice(index1,1);
//set options
//get the length of options
const optionlen=currentQuestions.options.length;
//push operation into available option array
for(let i=0;i<optionlen;i++)
{
    availableOptions.push(i)

}
//create options in html
for(let i=0;i<optionlen;i++)
{
    const option=document.createElement("div");
    option.innerHTML=currentQuestions.options[i];
    option.id=i;
    option.className="option";
    optionContainer.appendChild(option);
}
questioncounter++;

}

function next()
{

    if(questioncounter===quiz.length){
        console.log("Quiz over!")
    }
    else{
        getNewQuestion();
    }
}

window.onload=function(){
//first we will set all questions in available question array
    setAvailableQuestions();
//and then we will call getNewQuestion() function
    getNewQuestion()

}