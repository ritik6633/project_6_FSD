// script.js
const questions = [
  {
    question: "What is the largest galaxy in the Local Group?",
    options: ["Andromeda", "Milky Way", "Triangulum", "Sombrero"],
    answer: "Andromeda",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    question: "What is the closest planet to the Sun?",
    options: ["Mercury", "Venus", "Earth", "Mars"],
    answer: "Mercury",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Jupiter", "Saturn", "Neptune"],
    answer: "Jupiter",
  },
  {
    question: "What is the main component of the Sun?",
    options: ["Hydrogen", "Oxygen", "Carbon", "Helium"],
    answer: "Hydrogen",
  },
  {
    question: "Which planet is famous for its rings?",
    options: ["Saturn", "Jupiter", "Uranus", "Neptune"],
    answer: "Saturn",
  },
  {
    question: "Which space agency is known for the Apollo moon missions?",
    options: ["NASA", "ISRO", "ESA", "Roscosmos"],
    answer: "NASA",
  },
  {
    question: "What does ISRO stand for?",
    options: [
      "Indian Space Research Organization",
      "International Space Research Organization",
      "Indian Scientific Research Organization",
      "International Scientific Research Organization",
    ],
    answer: "Indian Space Research Organization",
  },
  {
    question: "Which planet has the most moons?",
    options: ["Mars", "Earth", "Jupiter", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the name of the galaxy that contains our solar system?",
    options: ["Andromeda", "Milky Way", "Whirlpool", "Sombrero"],
    answer: "Milky Way",
  },
  {
    question: "Which planet is known for having a Great Red Spot?",
    options: ["Jupiter", "Mars", "Saturn", "Neptune"],
    answer: "Jupiter",
  },
  {
    question:
      "What is the term for a moon that is larger than the planet it orbits?",
    options: ["Planetary moon", "Protoplanet", "Submoon", "None"],
    answer: "None",
  },
  {
    question: "What celestial body is known as the 'Evening Star'?",
    options: ["Mars", "Venus", "Jupiter", "Saturn"],
    answer: "Venus",
  },
  {
    question: "Which planet is the hottest in our solar system?",
    options: ["Mercury", "Venus", "Mars", "Jupiter"],
    answer: "Venus",
  },
  {
    question: "What is the Kuiper Belt?",
    options: [
      "Region of asteroids",
      "Outer planet region",
      "Region of comets",
      "Inner solar system",
    ],
    answer: "Region of comets",
  },
  {
    question: "Which spacecraft was the first to land on the Moon?",
    options: ["Apollo 11", "Voyager 1", "Mars Rover", "Hubble"],
    answer: "Apollo 11",
  },
  {
    question: "What is the speed of light?",
    options: ["300,000 km/s", "150,000 km/s", "500,000 km/s", "1,000,000 km/s"],
    answer: "300,000 km/s",
  },
  {
    question:
      "What are the small rocky bodies that orbit the Sun between Mars and Jupiter called?",
    options: ["Asteroids", "Comets", "Meteoroids", "Planets"],
    answer: "Asteroids",
  },
  {
    question: "Which planet is known for its extreme winds?",
    options: ["Neptune", "Mars", "Earth", "Venus"],
    answer: "Neptune",
  },
  {
    question:
      "What is the name of the first artificial satellite launched into space?",
    options: ["Vostok 1", "Sputnik 1", "Apollo 1", "Gemini 1"],
    answer: "Sputnik 1",
  },
  {
    question:
      "What phenomenon is known as the bending of light due to gravity?",
    options: [
      "Gravitational lensing",
      "Refraction",
      "Reflection",
      "Diffraction",
    ],
    answer: "Gravitational lensing",
  },
  {
    question: "Which planet is often called Earth's twin?",
    options: ["Mars", "Venus", "Mercury", "Saturn"],
    answer: "Venus",
  },
  {
    question: "What type of galaxy is the Milky Way?",
    options: ["Elliptical", "Spiral", "Irregular", "Lenticular"],
    answer: "Spiral",
  },
];

let currentQuestionIndex = 0;
let score = 0;

const quizContainer = document.querySelector(".quiz-container");
const leaderboardContainer = document.getElementById("leaderboard");
const historyContainer = document.getElementById("historyData");

if (quizContainer) {
  displayQuestion();

  function displayQuestion() {
    const question = questions[currentQuestionIndex];
    quizContainer.innerHTML = `
            <div class="question">
                <p>${question.question}</p>
                <form id="quizForm">
                    ${question.options
                      .map(
                        (option) => `
                        <label>
                            <input type="radio" name="option" value="${option}"> ${option}
                        </label>
                    `
                      )
                      .join("")}
                    <button type="submit">Next</button>
                </form>
            </div>
        `;

    document
      .getElementById("quizForm")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        const selectedOption = document.querySelector(
          'input[name="option"]:checked'
        );
        if (
          selectedOption &&
          selectedOption.value === questions[currentQuestionIndex].answer
        ) {
          score++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
          displayQuestion();
        } else {
          const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
          saveScoreToLeaderboard(loggedInUser.name, score);
          saveQuizHistory(loggedInUser.name, score);
          quizContainer.innerHTML = `<h2>Quiz Completed!</h2><p>Your score: ${score}</p><button onclick="window.location.href='leaderboard.html'">View Leaderboard</button>`;
        }
      });
  }

  function saveScoreToLeaderboard(name, score) {
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push({ name, score });
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  }

  function saveQuizHistory(name, score) {
    const quizHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
    quizHistory.push({ date: new Date().toLocaleDateString(), score });
    localStorage.setItem("quizHistory", JSON.stringify(quizHistory));
  }

  function loadLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboardContainer.innerHTML = leaderboard
      .map(
        (entry, index) => `
            <tr>
                <td>${index + 1}</td>
                <td><img src="${
                  entry.avatar || "default-avatar.png"
                }" alt="Avatar" style="width:50px; height:50px; border-radius:50%;"></td>
                <td>${entry.name}</td>
                <td>${entry.score}</td>
            </tr>
        `
      )
      .join("");
  }

  if (leaderboardContainer) {
    loadLeaderboard();
  }

  if (historyContainer) {
    const historyData = JSON.parse(localStorage.getItem("quizHistory")) || [];
    historyData.forEach((entry) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${entry.date}</td><td>${entry.score}</td>`;
      historyContainer.appendChild(row);
    });
  }
}
