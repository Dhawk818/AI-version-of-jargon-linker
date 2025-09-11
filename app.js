// Load saved words from localStorage or initialize an empty array
let wordDefinitions = JSON.parse(localStorage.getItem("wordDefinitions")) || [];
let currentSort = "alphabetical"; // default sort

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
    sortWords(); // ✅ ensure correct sort when switching tabs
  }
}

// Function to submit the word and definition
function submitWord() {
  const wordInput = document.getElementById("wordInput");
  const definitionInput = document.getElementById("definitionInput");

  const word = wordInput.value.trim();
  const definition = definitionInput.value.trim();

  if (word && definition) {
    // Add the new word-definition pair with timestamp
    wordDefinitions.push({ word, definition, timestamp: Date.now() });

    // Save to localStorage
    localStorage.setItem("wordDefinitions", JSON.stringify(wordDefinitions));

    // Clear input fields
    wordInput.value = "";
    definitionInput.value = "";

    alert("Word added successfully!");

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

  // Apply sorting
  let sortedWords = [...words];
  if (currentSort === "alphabetical") {
    sortedWords.sort((a, b) => a.word.localeCompare(b.word));
  } else if (currentSort === "recent") {
    sortedWords.sort((a, b) => b.timestamp - a.timestamp);
  }

  sortedWords.forEach(({ word, definition }, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = `${word}: ${definition}`;
    li.appendChild(span);

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.onclick = () => editWord(index);
    li.appendChild(editBtn);

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = () => deleteWord(index);
    li.appendChild(deleteBtn);

    wordList.appendChild(li);
  });
}

// Function to handle sorting
function sortWords() {
  currentSort = document.getElementById("sortSelect").value;
  renderWordList(wordDefinitions);
}

// Function to delete a word
function deleteWord(index) {
  if (confirm("Are you sure you want to delete this word?")) {
    wordDefinitions.splice(index, 1);
    localStorage.setItem("wordDefinitions", JSON.stringify(wordDefinitions));
    sortWords(); // ✅ reapply sorting after deletion
  }
}

// Function to edit a word
function editWord(index) {
  const newWord = prompt("Edit word:", wordDefinitions[index].word);
  const newDefinition = prompt("Edit definition:", wordDefinitions[index].definition);

  if (newWord && newDefinition) {
    // Update word and definition
    wordDefinitions[index] = { 
      word: newWord.trim(), 
      definition: newDefinition.trim(), 
      timestamp: Date.now() 
    };

    // Save to localStorage
    localStorage.setItem("wordDefinitions", JSON.stringify(wordDefinitions));

    // Clear input fields on Add Word tab
    document.getElementById("wordInput").value = "";
    document.getElementById("definitionInput").value = "";

    sortWords(); // ✅ reapply sorting after edit
    alert("Word updated successfully!");
  }
}

// Function to filter words based on input
function filterWords() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();

  // Filter by search term
  let filteredWords = wordDefinitions.filter(({ word }) =>
    word.toLowerCase().includes(searchTerm)
  );

  // ✅ Apply current sort to the filtered list
  if (currentSort === "alphabetical") {
    filteredWords.sort((a, b) => a.word.localeCompare(b.word));
  } else if (currentSort === "recent") {
    filteredWords.sort((a, b) => b.timestamp - a.timestamp);
  }

  renderWordList(filteredWords);
}

// ✅ Function to clear search and reset list
function clearSearch() {
  document.getElementById("searchInput").value = "";
  sortWords(); // re-render the full list based on current sort
}

// ✅ Add ESC key support to clear search
document.addEventListener("keydown", (event) => {
  const searchBox = document.getElementById("searchInput");
  if (event.key === "Escape" && document.activeElement === searchBox) {
    clearSearch();
    searchBox.blur(); // optional: removes focus so user sees reset
  }
});

// Initialize with the Add Word tab
window.onload = () => {
  switchTab();
};
