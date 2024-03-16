document.addEventListener("DOMContentLoaded", function() {
    const frame = document.querySelector(".frame");
    const compScoreDisplay = document.querySelector(".compScore");
    const userScoreDisplay = document.querySelector(".userScore");
    const playArea = document.querySelector(".playArea");
    const resultArea = document.querySelector(".resultArea");
    const playButtons = document.querySelectorAll(".option");     
    const rulesBtn = document.querySelector(".rulesBtn");   
    const rulesPopup = document.querySelector(".rules");
    const crossBtn = document.querySelector(".cross");
    const tieText = document.querySelector("#tieText");
    const winText = document.querySelector("#winText");
    const lostText = document.querySelector("#lostText");
    const subText = document.querySelector(".subText");
    const playAgainBtn = document.querySelector(".playBtn");
    const replayBtn = document.querySelector(".replayBtn");
    const nextBtn = document.querySelector(".nextBtn");    
    const hurrayScreen = document.querySelector(".hurrayScreen");
    const winnerPlayAgainBtn = document.querySelector(".winnerPlayBtn");
  
    // Initialize user and computer scores from local storage or default to 0
    let userScore = parseInt(localStorage.getItem("userScore")) || 0;
    let compScore = parseInt(localStorage.getItem("compScore")) || 0;
  
    //Display current scores of the user and computer
    userScoreDisplay.textContent = userScore;
    compScoreDisplay.textContent = compScore;
  
    //Selection of random choice by computer
    function computerPlay() {
      const choices = ["rock", "paper", "scissor"];
      return choices[Math.floor(Math.random() * choices.length)];
    }
  
    // Function to simulate a single round of the game
    function playRound(userChoice) {
      const compChoice = computerPlay();
      console.log("userChoice:", userChoice);
      console.log("compChoice:", compChoice);

      const userOptionIcon = document.querySelector(".userOptionIcon");
      const pcOptionIcon = document.querySelector(".pcOptionIcon");
  
      // Remove green background from previous round
      userOptionIcon.classList.remove("green-background");
      pcOptionIcon.classList.remove("green-background");
  
      // Hide play area and show result area
      document.querySelector('.playArea').style.display = "none";
      document.querySelector('.resultArea').style.display = "flex";

      // Hide all option icons
      document.querySelectorAll('.optionIcon').forEach(icon => {
        icon.style.display = 'none';
      });

      // Show user and computer choice icons based on the round result
      const userIcon = document.querySelector("#user-" + userChoice);
      userIcon.style.display = "flex";

      const compIcon = document.querySelector("#pc-" + compChoice);
      compIcon.style.display = "flex";

      // Determine the winner and update screen
      if (userChoice === compChoice) {
        tieText.style.display = "block";
        replayBtn.style.display = "block";
        winText.style.display = "none";
        lostText.style.display = "none";
        subText.style.display = "none";
        playAgainBtn.style.display = "none";
        nextBtn.style.display = "none";

        console.log("Winner: Tie");

      } else if (
        (userChoice === "rock" && compChoice === "scissor") ||
        (userChoice === "paper" && compChoice === "rock") ||
        (userChoice === "scissor" && compChoice === "paper")
      ) {
        winText.style.display = "block";
        subText.style.display = "block";
        playAgainBtn.style.display = "block";
        nextBtn.style.display = "inline";
        userScore++;
        userScoreDisplay.textContent = userScore;
        localStorage.setItem("userScore", userScore);
        userOptionIcon.classList.add("green-background");
        lostText.style.display = "none";
        tieText.style.display = "none";
        replayBtn.style.display = "none";

        console.log("Winner: User");

      } else {
        lostText.style.display = "block";
        subText.style.display = "block";
        playAgainBtn.style.display = "block";
        compScore++;
        compScoreDisplay.textContent = compScore;
        localStorage.setItem("compScore", compScore);
        pcOptionIcon.classList.add("green-background");
        winText.style.display = "none";
        tieText.style.display = "none";
        replayBtn.style.display = "none";
        nextBtn.style.display = "none";

        console.log("Winner: Computer");
      }
    }
  
    // Event listeners for user choice buttons
    playButtons.forEach(button => {
      button.addEventListener("click", function() {
        const userChoice = this.id;
        playRound(userChoice);
      });
    });

    // Function to handle play again functionality
    const playAgainHandler = (event) => {
        playArea.style.display = "flex";
        resultArea.style.display = "none";
        frame.style.display = "block";
        hurrayScreen.style.display = "none";
        nextBtn.style.display = "none";
    };

    playAgainBtn.addEventListener("click", playAgainHandler);
    winnerPlayAgainBtn.addEventListener("click", playAgainHandler);
    replayBtn.addEventListener("click", playAgainHandler);
  

    // Function to handle next button functionality
    const nextBtnHandler = () => {
      frame.style.display = "none";
      hurrayScreen.style.display = "flex";
      nextBtn.style.display = "none";
    };

    nextBtn.addEventListener("click", nextBtnHandler);
  
  
    // Function to display rules popup
    const rulesBtnHandler = () => {
      rulesPopup.style.display = "flex";
      crossBtn.style.display = "flex";
    };

    rulesBtn.addEventListener("click", rulesBtnHandler)

  
    // Function to hide rules popup
    const crossBtnHandler = () => {
      rulesPopup.style.display = "none";
      crossBtn.style.display = "none";
    };

    crossBtn.addEventListener("click", crossBtnHandler)
    
});
  
