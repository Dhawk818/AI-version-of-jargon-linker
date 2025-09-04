// Data structure to store word-definition pairs
let wordDefinitions = [];

// Function to switch between tabs
function switchTab() {
  const selectedTab = document.getElementById("menu").value;
  const addWordTab = document.getElementById("addWordTab");
  const definitionsTab = document.getElementById("definitionsTab");

  if (selectedTab === "addWord") {
    addWordTab.style.display = "block";
    definitionsTab.style.display = "none";
  } else {
    addWordTab.style.display = "none";
    definitionsTab.style.display = "block";
    renderWordList(wordDefinitions);
  }
}

// Function to submit the word and definition
function submitWord() {
  const wordInput = document.getElementById("wordInput").value;
  const definitionInput = document.getElementById("definitionInput").value;

  if (wordInput && definitionInput) {
    // Add the new word-definition pair
    wordDefinitions.push({ word: wordInput, definition: definitionInput });
    alert("Word added successfully!");
    
    // Clear input fields
    document.getElementById("wordInput").value = "";
    document.getElementById("definitionInput").value = "";
    
    // Switch to the Definitions tab
    document.getElementById("menu").value = "definitions";
    switchTab();
  } else {
    alert("Please provide both a word and a definition.");
  }
}

// Function to render the word list
function renderWordList(words) {
  const wordList = document.getElementById("wordList");
  wordList.innerHTML = ""; // Clear the existing list
  
  words.forEach(({ word, definition }) => {
    const li = document.createElement("li");
    li.textContent = `${word}: ${definition}`;
    wordList.appendChild(li);
  });
}

// Function to filter words based on input
function filterWords() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const filteredWords = wordDefinitions.filter(({ word }) => word.toLowerCase().includes(searchTerm));
  renderWordList(filteredWords);
}

// Initialize with the Add Word tab
window.onload = () => {
  switchTab();
};
