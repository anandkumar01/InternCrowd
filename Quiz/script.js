const questions = [
    {
        question: "Which framework belongs to Python?",
        answers: [
            { text: "JavaScript", correct: false },
            { text: "Django", correct: true },
            { text: ".Net", correct: false },
            { text: "Angular", correct: false },
        ]
    },
    {
        question: "SQL stands for?",
        answers: [
            { text: "Structured Query Language", correct: true },
            { text: "Single Query Language", correct: false },
            { text: "Single Questions Language", correct: false },
            { text: "None of the above", correct: false },
        ]
    },
    {
        question: "Which of the following is not a correct variable type?",
        answers: [
            { text: "int", correct: false },
            { text: "char", correct: false },
            { text: "real", correct: true },
            { text: "double", correct: false },
        ]
    },
    {
        question: "Which of the following is not a type of inheritance?",
        answers: [
            { text: "Multiple", correct: false },
            { text: "Multilevel", correct: false },
            { text: "Distributed", correct: true },
            { text: "Hierarchical", correct: false },
        ]
    }
];
const questionElement = document.getElementById("ques");
const ansButtons = document.getElementById("answer-btn");
const nextButton = document.getElementById("next-btn");

let currentQuesIndex = 0;
let score = 0;
function startQuiz() {
    currentQuesIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion() {
    resetState();
    let currentQues = questions[currentQuesIndex];
    let quesNo = currentQuesIndex + 1;
    questionElement.innerHTML = quesNo + ". " + currentQues.question;

    currentQues.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText= answer.text ;
        button.classList.add("btn");
        ansButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click", selectAns);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(ansButtons.firstChild){
        ansButtons.removeChild(ansButtons.firstChild);
    }
}

function selectAns(event){
    const selectedBtn = event.target;
    const iscorrect =selectedBtn.dataset.correct=="true";
    if(iscorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(ansButtons.children).forEach(button =>{
        if(button.dataset.correct=="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}
function showScore(){
    resetState();
    questionElement.innerHTML =  `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Start Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuesIndex++;
    if(currentQuesIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuesIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();