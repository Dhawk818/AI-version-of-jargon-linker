// Data structure to store word-definition pairs
let wordDefinitions = JSON.parse(localStorage.getItem("wordDefinitions")) || [];

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

// Function to submit or update a word and definition
function submitWord() {
  const wordInput = document.getElementById("wordInput").value.trim();
  const definitionInput = document.getElementById("definitionInput").value.trim();
  const editIndex = document.getElementById("editIndex").value;

  if (wordInput && definitionInput) {
    if (editIndex !== "") {
      // Update existing word
      wordDefinitions[editIndex] = { word: wordInput, definition: definitionInput };
      alert("Word updated successfully!");
      document.getElementById("editIndex").value = "";
    } else {
      // Add new word
      wordDefinitions.push({ word: wordInput, definition: definitionInput });
      alert("Word added successfully!");
    }

    // Save to localStorage
    localStorage.setItem("wordDefinitions", JSON.stringify(wordDefinitions));

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
  
  words.forEach(({ word, definition }, index) => {
    const li = document.createElement("li");

    const text = document.createElement("span");
    text.textContent = `${word}: ${definition} `;

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️ Edit";
    editBtn.classList.add("edit-btn");
    editBtn.onclick = () => editWord(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌ Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = () => deleteWord(index);

    li.appendChild(text);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    wordList.appendChild(li);
  });
}

// Function to edit a word
function editWord(index) {
  const { word, definition } = wordDefinitions[index];
  document.getElementById("wordInput").value = word;
  document.getElementById("definitionInput").value = definition;
  document.getElementById("editIndex").value = index;

  document.getElementById("menu").value = "addWord";
  switchTab();
}

// Function to delete a word
function deleteWord(index) {
  if (confirm("Are you sure you want to delete this word?")) {
    wordDefinitions.splice(index, 1); // remove word
    localStorage.setItem("wordDefinitions", JSON.stringify(wordDefinitions)); // update storage
    renderWordList(wordDefinitions); // re-render
  }
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
