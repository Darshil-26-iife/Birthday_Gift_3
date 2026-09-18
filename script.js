/* ================================= */
/* SCREEN SYSTEM */
/* ================================= */

function showScreen(id) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");
}

/* ================================= */
/* OPENING BOX + MOVING BUTTONS */
/* ================================= */

/* ================================= */
/* OPENING BOX + MOVING BUTTONS */
/* ================================= */

const originalBox = document.getElementById("originalBox");
const openingText = document.getElementById("openingText");
const fakeButtons = document.getElementById("fakeButtons");

let openingStep = 0;

/* Messages for every fake button */

const openingMessages = [
  "Open Kar",
  "Arey Brbr Open kar.",
  "Be Ek Box Open nhi Thatu..🤦",
  "Kn Pachu Try Kar.",
  "Arey Su kare che... 👀",
  "Be Tne Box Open karva Kidhu To Box Per Click kar ne. 😭",
];

/* Different positions for every button */

const buttonPositions = [
  {
    left: "12%",
    top: "25%",
  },

  {
    right: "12%",
    top: "18%",
  },

  {
    left: "8%",
    bottom: "18%",
  },

  {
    right: "8%",
    bottom: "25%",
  },

  {
    left: "48%",
    top: "12%",
  },

  {
    right: "35%",
    bottom: "12%",
  },
];


/* ================================= */
/* CREATE FAKE BUTTON */
/* ================================= */

function createFakeButton() {

  if (openingStep >= 5) {
    return;
  }

  openingStep++;

  /* Change message */

  openingText.innerText =
    openingMessages[openingStep - 1];

  /* Create button */

  const button = document.createElement("button");

  button.className = "fake-open-btn";

  button.innerText =
    openingStep === 5
      ? "FINAL OPEN 👀"
      : "OPEN 👻";

  /* Put button at different position */

  const position =
    buttonPositions[openingStep - 1];

  Object.assign(button.style, position);


  /* Button click */

  button.addEventListener("click", function () {

    button.remove();

    /* Final fake button */

    if (openingStep === 5) {

      originalBox.classList.add("unlocked");

      openingText.innerText =
        openingMessages[5];

      originalBox.style.animation =
        "boxReady 1s infinite alternate";

      return;
    }

    /* Create next button */

    createFakeButton();

  });


  fakeButtons.appendChild(button);
}


/* ================================= */
/* FIRST BUTTON APPEARS IMMEDIATELY */
/* ================================= */

/*
   This creates the first button
   as soon as the opening page loads.

   The gift box does NOT create it.
*/

createFakeButton();


/* ================================= */
/* ORIGINAL BOX */
/* ================================= */

/*
   The box does NOTHING during
   the fake-button sequence.

   Once all 6 fake buttons are
   completed, clicking the box
   opens the birthday page.
*/

originalBox.addEventListener("click", function () {

  if (openingStep >= 5) {

    showBirthday();

  }

});


/* ================================= */
/* SHOW BIRTHDAY */
/* ================================= */

function showBirthday() {

  fakeButtons.innerHTML = "";

  showScreen("birthday");

}

/* ================================= */
/* BIRTHDAY → CHALLENGES */
/* ================================= */

document
  .getElementById("startChallenges")
  .addEventListener("click", function () {
    showScreen("challengeIntro");
  });

/* ================================= */
/* CHALLENGE INTRO → GAME */
/* ================================= */

document.getElementById("startGame").addEventListener("click", function () {
  showScreen("game");

  startStarGame();
});

/* ================================= */
/* STAR GAME */
/* ================================= */

let score = 0;

let timeLeft = 15;

let gameRunning = false;

let timerInterval;

let starTimeout;

const star = document.getElementById("star");

const gameArea = document.getElementById("gameArea");

const scoreDisplay = document.getElementById("score");

const timerDisplay = document.getElementById("timer");

function startStarGame() {
  score = 0;

  timeLeft = 15;

  gameRunning = true;

  scoreDisplay.innerText = score;

  timerDisplay.innerText = timeLeft;

  star.style.display = "block";

  moveStar();

  timerInterval = setInterval(function () {
    timeLeft--;

    timerDisplay.innerText = timeLeft;

    if (timeLeft <= 0) {
      endStarGame();
    }
  }, 1000);
}

/*
    Move star randomly.
*/

function moveStar() {
  if (!gameRunning) {
    return;
  }

  const areaWidth = gameArea.clientWidth;

  const areaHeight = gameArea.clientHeight;

  const maxX = areaWidth - 45;

  const maxY = areaHeight - 45;

  const randomX = Math.random() * maxX;

  const randomY = Math.random() * maxY;

  star.style.left = randomX + "px";

  star.style.top = randomY + "px";

  /*
        Automatically move
        after a short time.

        This makes it harder.
    */

  clearTimeout(starTimeout);

  starTimeout = setTimeout(
    function () {
      moveStar();
    },
    250 + Math.random() * 300,
  );
}

/*
    Catch star.
*/

star.addEventListener("click", function (event) {
  event.stopPropagation();

  if (!gameRunning) {
    return;
  }

  score++;

  scoreDisplay.innerText = score;

  moveStar();
});

/*
    End star game.
*/

function endStarGame() {
  gameRunning = false;

  clearInterval(timerInterval);

  clearTimeout(starTimeout);

  star.style.display = "none";

  document.getElementById("finalScore").innerText = score;

  let message;

  if (score >= 13) {
    message = `
            WHAT?! 😭<br><br>

            Badha Pakday Gya!
            ${score}/15.
            <br><br>
            Hacker Che Be tu 🫡.
            Perfect!! Ek Dum Tara jem. ❤️
        `;
  } else if (score >= 10) {
    message = `
            ${score}/15 😂<br><br>
            Hmm Well Played...<br><br>
            Pn Etlu Pn Saru Ni Htu. 😂<br><br>
            Kn Pn Tu Always 10/10 Che. ❤️
        `;
  } else if (score >= 7) {
    message = `
            ${score}/15 😭<br><br>

            Okay... Atlu Khrab.
            Kn Thy Thy.
            <br><br>
            Kn Pn Tu Always 10/10 Che. ❤️
        `;
  } else {
    message = `
            ${score}/15 💀<br><br>

            Arey Su Kare Che?! 😂
            <br><br>
            Ana Karta Saru Me Rami lete.
            <br><br>
            Pn Kai ni Tu Always 10/10 Che. ❤️
        `;
  }

  document.getElementById("scoreMessage").innerHTML = message;

  setTimeout(function () {
    showScreen("starResult");
  }, 500);
}

/* ================================= */
/* STAR RESULT → MATH */
/* ================================= */

document.getElementById("nextChallenge").addEventListener("click", function () {
  showScreen("mathChallenge");
});

/* ================================= */
/* SHOW ANSWER */
/* ================================= */

document.getElementById("showAnswer").addEventListener("click", function () {
  document.getElementById("mathResult").innerHTML = `

                    <strong>
                        THE ANSWER:
                    </strong>
                    <br>
                    Mane Pn Nhi Avdto. 💀
                    <br>
                    Skip Kari De Nito Pag Dukhse. 🤣
                `;
});

/* ================================= */
/* SKIP → NEW PAGE WITH REWARD */
/* ================================= */

document.getElementById("skipQuestion").addEventListener("click", function () {
  /*
                Directly go to the
                NEW reward page.
            */

  showScreen("reward");
});

/* ================================= */
/* REWARD → FINAL */
/* ================================= */

document.getElementById("finalButton").addEventListener("click", function () {
  showScreen("finalMessage");

  startFinalAnimation();
});

/* ================================= */
/* FINAL CONFETTI */
/* ================================= */

function startFinalAnimation() {
  const container = document.getElementById("confetti-container");

  container.innerHTML = "";

  for (let i = 0; i < 150; i++) {
    const piece = document.createElement("div");

    piece.className = "confetti";

    piece.style.left = Math.random() * 100 + "%";

    piece.style.animationDuration = 3 + Math.random() * 5 + "s";

    piece.style.animationDelay = Math.random() * 3 + "s";

    const size = 5 + Math.random() * 8;

    piece.style.width = size + "px";

    piece.style.height = size * 1.5 + "px";

    piece.style.background = `hsl(
                ${Math.random() * 360},
                90%,
                70%
            )`;

    container.appendChild(piece);
  }
}

/* ================================= */
/* MATH ANSWER */
/* ================================= */

const mathAnswer = document.getElementById("mathAnswer");
const submitAnswer = document.getElementById("submitAnswer");
const mathResult = document.getElementById("mathResult");

submitAnswer.addEventListener("click", function () {

  const answer = mathAnswer.value.trim();

  if (answer === "") {

    mathResult.innerHTML = `
      <strong>HEY! 😭</strong>
      <br><br>
      Be Kai Lakhavu pade.
    `;

    return;
  }


  /*
     Convert the answer to lowercase
     so different capitalizations
     are accepted.
  */

  const cleanAnswer = answer
    .toLowerCase()
    .replace(/\s+/g, "");


  /*
     Correct answers.

     Accept a few different ways
     she might write the equation.
  */

  const correctAnswers = [
    "asin(ωt+φ)",
    "asin(wt+φ)",
    "asin(wt+phi)",
    "a*sin(wt+phi)",
    "x=asin(wt+phi)",
    "x=asin(ωt+φ)",
    "x=a*sin(wt+phi)"
  ];


  const isCorrect =
    correctAnswers.includes(cleanAnswer);


  /* ================================= */
  /* CORRECT ANSWER */
  /* ================================= */

  if (isCorrect) {

    mathResult.innerHTML = `
      <strong>WAIT... WHAT?! 😭</strong>
      <br><br>

      Tane Avdi Gyu Etle Sache Hacker Che Be Tu. 💀
      <br><br>

      <strong>CHALLENGE 02 PASSED. 🧠✨</strong>
    `;

    return;
  }


  /* ================================= */
  /* WRONG ANSWER */
  /* ================================= */

  mathResult.innerHTML = `
    <strong>Hmm... 🤔</strong>
    <br>
    Ni Avde To Skip Kari Deva nu. 😂
    <br>
  `;

});
