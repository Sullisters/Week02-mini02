var questionsMap = new Map([
    ["Who created the Dwarves?", ["Aulë", "Ilúvatar", "Celebrimbor", "Gil-Galad"]],
    [
      "How many Dwarves did Aulë initially create?",
      ["seven", "one", "one thousand", "two"],
    ],
    [
      "The seven Fathers of the Dwarves awoke in pairs, so their clans were strongly connected afterward, except one. Which of the Fathers awoke alone, and thus settled his clan far from other Dwarves?",
      ["Durin", "Úri", "Linnar ", "Manwe"],
    ],
    [
      "What do Dwarves call themselves in their own language?",
      ["Khazâd", "Buzundush", "Gundur", "Granad"],
    ],
    [
      "What was the name of the kingdom Durin carved out of the Misty Mountains before it was called Moria (which is an Elven word meaning 'Black Pit')?",
      ["Khazad-dûm", "Thrór", "Sigin-tarâg", "Urk-garud"],
    ],
    [
      "Many Dwarves from the other six clans came to live in Khazad-dûm after what event in Middle-earth's First Age?",
      ["the War of Wrath", "the destruction of the Two Trees by Morgoth", "the Dagor Bragollach", "the coming of the Elves"],
    ],
    [
      "How many Rings of Power did Sauron give to the Dwarves?",
      ["seven", "two", "three", "nine"],
    ],
    [
      "Why did Sauron eventually try to reclaim the rings from the Dwarves?",
      ["The Dwarves were too resistant to their power, and Sauron was unable to control them.", "Sauron realized the Dwarves' rings might be used to unmake the One Ring.", "Sauron wanted to consolidate their power to strengthen his armies during the Last Alliance of Elves and Men.", "Sauron just didn't like Dwarves."],
    ],
    [
      "What affect did the Rings have on the Dwarven kings?",
      ["They increased their love of material wealth.", "They made them mortal — the Dwarf-Fathers would have lived forever if they'd never taken the rings.", "They made them dislike sunlight, increasing their tendency to live underground.", "They made them hate Elves."],
    ],
    [
      "What is the name of the extremely rare metal the Dwarves were renowned for mining and crafting weapons, armor and jewelry out of?",
      ["mithril", "ionnatar", "idril", "Udún"],
    ],
    [
      "Their greed caused the Dwarves in Khazad-dûm to dig deeper and deeper in search of mithril. Under Durin VI, they awakened something with their deepest delvings. What was it?",
      ["a Balrog", "a shard of Morgoth", "a dragon", "Goblins"],
    ],
    [
      "When Thrór returned to Khazad-dûm to reclaim it in his later years, the great orc Azog beheaded him. What did Azog carve into Thrór's forehead?",
      ["His own name, 'Azog', in Dwarven runes.", "The true name of Durin's Bane.", "A curse on Thrór's line.", "The end of the Age of Dwarves"],
    ],
    [
      "Why did the Dwarves under Thráin leave Erebor?",
      ["The dragon Smaug took over the mountain and drove them out.", "The Noldor laid claim to the mountain, and Thráin and his Dwarves left to prevent a costly war.", "Thráin had gradually gone mad while wearing one of the seven Rings, and he led his people on a fruitless quest to recover the missing Rings from Sauron.", "Goblins"],
    ],
    [
      "Thráin gathered an army of Dwarves and defeated Azog and the orcs at the Battle of Azanulbizar. However, they were unable to reclaim Khazad-dûm. Why?",
      ["The Balrog, Durin's Bane, was still there, and they were not powerful enough to defeat it.", "The breaking of the dam at Gundulgathu had completely flooded the entire city.", "The ferocity of the battle had collapsed the entrance, and not even Dwarves could find a way in.", "The Dwarves had suffered too many losses."],
    ]
  ]);
  
  // global variables
  var timer = document.getElementById("timer");
  var qNumber = 1;
  var question = "";
  var answers = [];
  var secondsLeft;
  var timerInterval;
  var highScores = [];
  var totalQuestions = questionsMap.size;
  let score;
  
  // run compare function on click of the answer buttons
  for (let i = 0; i < 4; i++) {
    document
      .getElementById("button" + (i + 1))
      .addEventListener("click", function () {
        compare(this);
      });
  }
  
  // checks if correct
  function compare(selection) {
    if (selection.textContent === answers[0]) {
      // on correct answer change button color to a lighter and increment score
      console.log(selection);
      selection.setAttribute("style", "background-color: purple");
      score++;
      // revert after 1 second
      setTimeout(() => {
        selection.setAttribute("style", "background-color: --var(secondary)");
      }, 1000);
    } else {
      // on wrong answer set button color to red and display correct answer below
      selection.setAttribute("style", "background-color: red");
      document.getElementById("alert").textContent = `(Answer: ${answers[0]})`
      // revert after 1 second
      setTimeout(() => {
        selection.setAttribute("style", "background-color: --var(primary)");
        document.getElementById("alert").textContent = "";
      }, 1000);
    }
    // calls next question regardless
    setTimeout(() => {
      loadQuestion();
    }, 1000);
  }
  
  function loadQuestion() {
    // end game after last q
    if (qNumber > questionsMap.size) {
      endGame();
    } else {
      // set question# and get question from map
      question = Array.from(questionsMap.keys())[qNumber - 1];
      document.getElementById("qNumber").textContent =
        "Question #" + qNumber + " out of " + totalQuestions;
      document.getElementById("question").textContent = question;
      // get answers
      answers = questionsMap.get(question);
      // first copy answers, then shuffle choices
      var shuffledAnswers = answers.slice(0);
      shuffleArray(shuffledAnswers);
      // put choices in the buttons
      for (let i = 0; i < 4; i++) {
        document.getElementById("button" + (i + 1)).textContent =
          shuffledAnswers[i];
      }
      // tick qNumber
      qNumber++;
    }
  }
  
  // "durstendfeld" shuffle found on stackoverflow
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
  
  function setTime(time) {
    // Sets interval in variable
    score = 0;
    secondsLeft = time;
    timer.textContent = "Time remaining: " + secondsLeft + " seconds";
    timerInterval = setInterval(function () {
      secondsLeft--;
      timer.textContent = "Time remaining: " + secondsLeft + " seconds";
      if (secondsLeft < 1) {
        // Calls for endgame function to run when timer runs out
        endGame();
      }
    }, 1000);
  }
  
  function endGame() {
    // set any negative score to zero
    if (secondsLeft < 0) {
      secondsLeft = 0;
    }
    // clears questions, buttons, and timer
    document.getElementById("answers").remove();
    document.getElementById("timer").remove();
    clearInterval(timerInterval);
    document.getElementById("qNumber").textContent = "";
    // posts centered endgame message and ask for initials
    document.getElementById("question").textContent =
      "You scored " + score + " points";
    document.getElementById("sub-prompt").textContent =
      "Enter your initials";
    document
      .getElementById("questions")
      .setAttribute("style", "text-align: center");
    // call getInitials func
    getInitials();
  }
  
  function getInitials() {
    // get main section to attach to
    var section = document.querySelector("main");
    // create form and append to main
    var form = document.createElement("form");
    form.id = "form";
    section.appendChild(form);
    // create label
    var label = document.createElement("label");
    form.appendChild(label);
    label.textContent = "Initials: ";
    label.setAttribute("for", initialsInput);
    // create input
    var initialsInput = document.createElement("input");
    form.appendChild(initialsInput);
    initialsInput.setAttribute("type", "text");
    initialsInput.setAttribute("maxlength", "3");
    // create submit button
    var submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("value", "Submit");
    submit.setAttribute("style", "margin: 10px");
    form.appendChild(submit);
    // call function for submit actions
    submitEvent(initialsInput, form);
  }
  
  function submitEvent(initialsInput, form) {
    // add submit event
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var initials = initialsInput.value.toUpperCase();
      // Return from function early if submitted initials are blank
      if (initials === "") {
        alert("Cannot be blank");
        return;
      }
      var newScore = [initials, score];
      localStorage.setItem("newScore", JSON.stringify(newScore));
      window.location.href = "../html/highscores.html";
    });
  }
  
  // begins game
  loadQuestion();
  setTime(60);
  