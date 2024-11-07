// Initialize quotes array with data from localStorage if available
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", category: "Inspiration" }
  ];
  
  // Function to save quotes to localStorage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }
  
  // Function to populate categories dynamically
  function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = [...new Set(quotes.map(quote => quote.category))];
  
    // Clear existing options and add "All Categories"
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
    
    // Restore the last selected category if available
    const lastSelectedCategory = localStorage.getItem('selectedCategory');
    if (lastSelectedCategory) {
      categoryFilter.value = lastSelectedCategory;
    }
  }
  
  // Function to display quotes based on selected category
  function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    localStorage.setItem('selectedCategory', selectedCategory); // Save filter choice
  
    const filteredQuotes = selectedCategory === 'all'
      ? quotes
      : quotes.filter(quote => quote.category === selectedCategory);
    
    const quoteDisplay = document.getElementById('quoteDisplay');
    const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
    
    quoteDisplay.innerHTML = `
      <p>"${randomQuote.text}"</p>
      <p><strong>Category:</strong> ${randomQuote.category}</p>
    `;
  }
  
  // Modified function to add a new quote and update categories
  function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value;
    const quoteCategory = document.getElementById('newQuoteCategory').value;
  
    if (quoteText && quoteCategory) {
      quotes.push({ text: quoteText, category: quoteCategory });
      saveQuotes(); // Save the updated quotes array to localStorage
      populateCategories(); // Update categories dropdown
  
      // Clear the input fields
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
  
      // Show the newly added quote
      filterQuotes();
    } else {
      alert("Please enter both a quote and a category.");
    }
  }
  
  // Function to create and download the JSON file
  function exportToJson() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
  
    URL.revokeObjectURL(url);
  }
  
  // Function to handle JSON import (file upload)
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
  
    fileReader.onload = function(event) {
      try {
        const importedQuotes = JSON.parse(event.target.result);
        if (Array.isArray(importedQuotes)) {
          quotes = importedQuotes;
          saveQuotes();
          populateCategories();
          filterQuotes();
          alert('Quotes imported successfully!');
        } else {
          alert('Invalid JSON format. Make sure the file contains an array of quote objects.');
        }
      } catch (error) {
        alert('Error reading the file. Please make sure the file is a valid JSON.');
      }
    };
  
    fileReader.readAsText(event.target.files[0]);
  }
  
  // Event listeners
  document.getElementById('newQuote').addEventListener('click', filterQuotes);
  document.getElementById('exportJson').addEventListener('click', exportToJson);
  document.getElementById('importFile').addEventListener('change', importFromJsonFile);
  
  window.onload = () => {
    populateCategories(); // Populate categories dropdown on load
    filterQuotes(); // Show a quote based on the last selected filter
  };
  