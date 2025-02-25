const questions = [
    {
        question: "Which is largest animal in the world?",
        answers:[
            {Text: "Shark", correct: false},
            {Text: "Blue Whale", correct: true},
            {Text: "Tiger", correct: false},
            {Text: "Elephant", correct: false},
        ]
    },
    {
        question: "National Bird of India?",
        answers:[
            {Text: "Sparrow", correct: false},
            {Text: "Humming Bird", correct: false},
            {Text: "Dove", correct: false},
            {Text: "Peacock", correct: true},
        ]
    },
    {
        question: "What is the national sports of India?",
        answers:[
            {Text: "Hockey", correct: true},
            {Text: "Cricket", correct: false},
            {Text: "Kho Kho", correct: false},
            {Text: "Chess", correct: false},
        ]
    },
    {
        question: "Who is the founder of Oracle?",
        answers:[
            {Text: "Larry Ellison", correct: true},
            {Text: "John Doe", correct: false},
            {Text: "Gabriel Wallzart", correct: false},
            {Text: "Edmund Pigguet", correct: false},
        ]
    },
    {
        question: "Scientific Name for Human Beigns?",
        answers:[
            {Text: "Canis lupus", correct: false},
            {Text: "Homo sapiens", correct: true},
            {Text: "Felis catus", correct: false},
            {Text: "Panthera leo", correct: false},
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex= 0;
    score = 0;
    nextButton.innerHTML= "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion= questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1 ; 
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct= answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none"
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn  = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML= "Play Again."
    nextButton.style.display = "block"
}

function handleNexButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNexButton();
    }
    else{
        startQuiz();
    }
});
startQuiz();