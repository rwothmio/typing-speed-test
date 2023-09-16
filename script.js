const stories = [
  "In a remarkable development, scientists have announced a major breakthrough in cancer research. A new treatment, based on gene therapy, has shown unprecedented success in clinical trials, offering hope to millions of patients worldwide. The treatment targets specific genetic mutations responsible for various types of cancer and has demonstrated remarkable efficacy in early trials.",

  "After years of negotiations, a historic peace accord has been reached, bringing an end to a decades-long conflict that has ravaged a region. The accord was signed by leaders from both sides, marking a significant step towards lasting peace and reconciliation. International observers have praised the agreement as a symbol of hope for conflict resolution worldwide.",

  "Astronomers have made an exciting discovery - a new exoplanet located in the habitable zone of a distant star. The planet, named 'Veridian,' has the right conditions to support liquid water, making it a prime candidate for the existence of extraterrestrial life. Researchers are eagerly planning missions to learn more about this promising world.",

  "In response to the growing plastic pollution crisis, global efforts are intensifying to reduce plastic waste and protect the environment. Governments and organizations around the world have pledged to take action, including implementing stricter regulations on single-use plastics and promoting sustainable alternatives.",

  "Artificial intelligence is revolutionizing the healthcare industry with its ability to diagnose diseases, predict patient outcomes, and streamline medical procedures. Experts predict that AI-driven healthcare solutions will greatly improve patient care, reduce costs, and enhance medical research.",

  "The world is celebrating a historic achievement as a multinational team of scientists and engineers successfully landed a rover on Mars. The mission aims to explore the Martian surface, search for signs of past life, and pave the way for future human missions to the Red Planet.",

  "Efforts to bridge the digital divide in education are gaining momentum. Various initiatives are providing underprivileged students with access to technology and the internet, ensuring that every child has an equal opportunity to learn and thrive in the digital age.",

  "As the global population continues to grow, sustainable agriculture practices are playing a crucial role in addressing food insecurity. Farmers worldwide are adopting eco-friendly farming methods to increase crop yields while preserving natural resources.",

  "Renewable energy sources, such as solar and wind power, have surpassed fossil fuels as the leading source of electricity generation in several countries. This transition marks a significant milestone in the fight against climate change and the shift towards cleaner energy alternatives.",

  "A cultural exchange program, bringing together individuals from diverse backgrounds, is fostering global understanding and friendship. Participants from different countries are sharing their traditions, languages, and experiences, breaking down barriers and promoting tolerance and peace.",
];

const body = document.querySelector("body");
const characters = document.querySelector(".characters");
const result = document.querySelector(".result");
const startButton = document.getElementById("start");
const retakeButton = document.getElementById("retake");
const speedValueContainer = document.querySelector(".speed");
const accuracyValueContainer = document.querySelector(".accuracy");
let charElements;
let currentCharacterIndex = 0;
let correctCount = 0;
let totalAttempts = 0;
let startTime;
let stopTime;

const resetValues = () => {
  currentCharacterIndex = 0;
  correctCount = 0;
  totalAttempts = 0;
  startTime;
  stopTime;
};

const generateCharacters = (content) => {
  characters.innerHTML = "";
  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const el = document.createElement("div");
    if (char == " ") el.classList.add("space-character");
    el.textContent = char;
    el.classList.add("character");
    characters.appendChild(el);
  }
  charElements = document.querySelectorAll(".character");
};

const compareCharacters = (inputChar) => {
  const currentCharElement = charElements[currentCharacterIndex];
  currentCharElement.classList.remove("current");
  if (inputChar === currentCharElement.textContent) {
    currentCharElement.classList.add("correct");
    correctCount += 1;
  } else {
    currentCharElement.classList.add("wrong");
  }
  totalAttempts += 1;
  if (charElements[currentCharacterIndex + 1]) {
    charElements[currentCharacterIndex + 1].classList.add("current");
    currentCharacterIndex += 1;
  }
};

const handleKeyDown = (e) => {
  const input = e.key;
  e.preventDefault();
  if (input !== "Shift") compareCharacters(input);
};

const startTest = () => {
generateCharacters(stories[0])
  charElements[currentCharacterIndex].classList.add("current");
  body.addEventListener("keydown", handleKeyDown);
  const t1 = new Date();
  startTime = t1.getTime();
  setTimeout(() => {
    displayResult();
  }, 60000);
};

const displayResult = () => {
  const t2 = new Date();
  stopTime = t2.getTime();
  body.removeEventListener("keydown", handleKeyDown);

  const durationInMinutes = (stopTime - startTime) / 1000 / 60;
  const totalWords = totalAttempts / 5;
  const speed = totalWords / durationInMinutes;
  const accuracy = (correctCount / totalAttempts) * 100;

  speedValueContainer.textContent = speed.toFixed(0);
  accuracyValueContainer.textContent = accuracy.toFixed(0);

  characters.classList.add("hide");
  result.classList.remove("hide");
};

startButton.addEventListener("click", () => {
  startButton.classList.add("hide");
  characters.classList.remove("hide");
  startTest();
});
retakeButton.addEventListener("click", () => {
  result.classList.add("hide");
  characters.classList.remove("hide");
  resetValues();
  generateCharacters(stories[0])
  startTest();
});
