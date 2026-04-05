const StartGame = document.getElementById("Start-Game");
const GameDisplay = document.getElementById("Game-Display");
const ScoreDisplay = document.getElementById("Score-Display");
const StartButton = document.getElementById("Start-Button");
const F1Question = document.getElementById("F1-Question");
const AnswersContainer = document.getElementById("answers-container");
const CurrentQuestion = document.getElementById("current-question");
const TotalQuestions = document.getElementById("total-questions");
const GameScore = document.getElementById("score");
const TotalScore = document.getElementById("Total-Score");
const MaximumScore = document.getElementById("Maximum-Score");
const ScoreFeedback = document.getElementById("Score-Feedback");
const RestartButton = document.getElementById("Restart-Button");
const ProgressBar = document.getElementById("progress");

const QuizQuestion = [
    {
        question:"Who has won the most Formula 1 World Championships?",
        answers:[
            {text:"Michael Schumacher", correct:false},
            {text:"Lewis Hamilton", correct:true},
            {text:"Ayrton Senna", correct:false},
            {text:"Sebastian Vettel", correct:false},
        ],
    },
    {
        question:"Which team is known as the “Prancing Horse”?",
        answers:[
            {text:"Mercedes", correct:false},
            {text:"Red Bull", correct:false},
            {text:"Ferrari", correct:true},
            {text:"McLaren", correct:false},
        ],
    },
    {
        question:"What does DRS stand for?",
        answers:[
            {text:"Drag Reduction System", correct:true},
            {text:"Dynamic Racing Speed", correct:false},
            {text:"Downforce Regulation System", correct:false},
            {text:"Drive Response Setup", correct:false},
        ],
    },
    {
        question:"Which country hosts the Monaco Grand Prix?",
        answers:[
            {text:"Italy", correct:false},
            {text:"France", correct:false},
            {text:"Monaco", correct:true},
            {text:"Spain", correct:false},
        ],
    },
    {
        question:"How many tyres does each driver get for a race weekend (dry tyres)?",
        answers:[
            {text:"10", correct:false},
            {text:"13", correct:true},
            {text:"15", correct:false},
            {text:"18", correct:false},
        ],
    },
    {
        question:"Which driver is known as “The Iceman”?",
        answers:[
            {text:"Max Verstappen", correct:false},
            {text:"Kimi Räikkönen", correct:true},
            {text:"Fernando Alonso", correct:false},
            {text:"Valtteri Bottas", correct:false},
        ],
    },
    {
        question:"What colour flag indicates a race has been stopped?",
        answers:[
            {text:"Yellow", correct:false},
            {text:"Blue", correct:false},
            {text:"red", correct:true},
            {text:"Black", correct:false},
        ],
    },
    {
        question:"Which team did Max Verstappen win his first championship with?",
        answers:[
            {text:"Ferrari", correct:false},
            {text:"Mercedes", correct:false},
            {text:"Red Bull Racing", correct:true},
            {text:"MCLaren", correct:false},
        ],
    },
    {
        question:"What is the minimum age to race in Formula 1 (as of recent rules)?",
        answers:[
            {text:"16", correct:false},
            {text:"17", correct:false},
            {text:"18", correct:true},
            {text:"21", correct:false},
        ],
    },
    {
        question:"What is the name of the F1 governing body?",
        answers:[
            {text:"FIA", correct:true},
            {text:"FOM", correct:false},
            {text:"FISA", correct:false},
            {text:"F1 Org", correct:false},
        ],
    },
];

// QUIZ STATE VARS
let CurrentQuestionIndex = 0;
let Score = 0;
let AnswersDisabled = false;

TotalQuestions.textContent = QuizQuestion.length;
MaximumScore.textContent = QuizQuestion.length;

// event listeners
StartButton.addEventListener("click",StartQuiz);
RestartButton.addEventListener("click",RestartQuiz);

function StartQuiz(){
    CurrentQuestionIndex = 0;
    Score = 0;
    GameScore.textContent = 0;
    
    StartGame.classList.remove("active");
    GameDisplay.classList.add("active");
    
    ShowQuestion();
}

function ShowQuestion()
{
    AnswersDisabled = false;

    const CurrentQ = QuizQuestion[CurrentQuestionIndex];
    CurrentQuestion.textContent = CurrentQuestionIndex+1;

    const ProgressPercent = ((CurrentQuestionIndex + 1) / QuizQuestion.length) * 100;

    ProgressBar.style.width = ProgressPercent + "%";

    F1Question.textContent = CurrentQ.question;

    AnswersContainer.innerHTML = "";

    CurrentQ.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-button");
        
        // what is dataset? it's a property of the button element that allows you to store custom data
        button.dataset.correct = answer.correct;
        button.addEventListener("click",SelectAnswer);
        AnswersContainer.appendChild(button);
    });
}

function SelectAnswer(event){
    if (AnswersDisabled) return;

    AnswersDisabled = true;

    const SelectedButton = event.target;
    const isCorrect = SelectedButton.dataset.correct === "true";


    Array.from(AnswersContainer.children).forEach((button)=>{
        if (button.dataset.correct === "true"){
            button.classList.add("correct");
        } else if (button===SelectedButton){
            button.classList.add("incorrect");
        }
    });

    if (isCorrect){
        Score++;
        GameScore.textContent = Score;
    }

    setTimeout(()=>{
        CurrentQuestionIndex++;

        // check if there are more questions or if the quiz is over
        if (CurrentQuestionIndex<QuizQuestion.length){
            ShowQuestion();
        } else{
            ShowResults();
        }
    },1000);
}

function ShowResults(){
    GameDisplay.classList.remove("active");
    ScoreDisplay.classList.add("active");

    TotalScore.textContent = Score;

    const percentage = (Score/QuizQuestion.length)*100;

    if (percentage==100){
        ScoreFeedback.textContent = "Perfect! You're a F1 Champion!";    
    } else if (percentage>=80){
        ScoreFeedback.textContent = "Great job! You are almost a F1 Champion!";
    } else if (percentage>=60){
        ScoreFeedback.textContent = "Good effort! Keep going!";
    } else if (percentage>=40){
        ScoreFeedback.textContent = "Not bad! Keep going!";
    } else{
        ScoreFeedback.textContent = "Keep going! You'll get better!";
    }
}

function RestartQuiz(){
    ScoreDisplay.classList.remove("active");

    StartQuiz();
}