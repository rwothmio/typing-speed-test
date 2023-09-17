const story =
  "A cultural exchange program, bringing together individuals from diverse backgrounds, is fostering global understanding and friendship. Participants from different countries are sharing their traditions, languages, and experiences, breaking down barriers and promoting tolerance and peace.";

const body = document.querySelector("body");
const charactersContainer = document.querySelector(".characters");
const result = document.querySelector(".result");
const startButton = document.getElementById("start");
const retakeButton = document.getElementById("retake");
const speedValueContainer = document.querySelector(".speed");
const accuracyValueContainer = document.querySelector(".accuracy");

let charElements;
let currentCharIndex = 0;
let correctCount = 0;
let totalAttempts = 0;
let startTime;
let stopTime;

const generateCharacters = (content) => {
  charactersContainer.innerHTML = "";

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const el = document.createElement("div");
    if (char === " ") el.classList.add("space-character");
    el.textContent = char;
    el.classList.add("character");
    charactersContainer.appendChild(el);
  }
  charElements = document.querySelectorAll(".character");
};

const compareCharacters = (inputChar) => {
  const currentCharElement = charElements[currentCharIndex];
  currentCharElement.classList.remove("current");

  if (inputChar === currentCharElement.textContent) {
    currentCharElement.classList.add("correct");
    correctCount += 1;
  } else {
    currentCharElement.classList.add("wrong");
  }
  totalAttempts += 1;

  if (charElements[currentCharIndex + 1]) {
    charElements[currentCharIndex + 1].classList.add("current");
    currentCharIndex += 1;
  }
};

const handleKeydown = (e) => {
  const input = e.key;
  e.preventDefault();
  if (input !== "Shift") compareCharacters(input);
};

const startTest = () => {
  generateCharacters(story);
  charElements[currentCharIndex].classList.add("current");
  body.addEventListener("keydown", handleKeydown);

  const t1 = new Date();
  startTime = t1.getTime();

  setTimeout(() => displayResult(), 60000);
};

const displayResult = () => {
  const t2 = new Date();
  stopTime = t2.getTime();

  body.removeEventListener("keydown", handleKeydown);

  const durationInMinutes = (stopTime - startTime) / 1000 / 60;
  const totalWords = totalAttempts / 5;
  const speed = totalWords / durationInMinutes;
  const accuracy = (correctCount / totalAttempts) * 100;

  speedValueContainer.textContent = speed.toFixed(0);
  accuracyValueContainer.textContent = accuracy.toFixed(0);

  charactersContainer.classList.add("hide");
  result.classList.remove("hide");
};

const resetValues = () => {
  currentCharIndex = 0;
  correctCount = 0;
  totalAttempts = 0;
  startTime;
  stopTime;
};


startButton.addEventListener("click", () => {
    startButton.classList.add("hide");
    charactersContainer.classList.remove("hide");
    startTest();
})

retakeButton.addEventListener("click", () => {
    result.classList.add("hide");
    charactersContainer.classList.remove("hide");
    resetValues();
    generateCharacters(story);
    startTest();
})