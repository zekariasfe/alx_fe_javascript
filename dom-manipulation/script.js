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
  
  // Function to display a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
  
    // Save the last viewed quote to sessionStorage
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(quote));
  
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `
      <p>"${quote.text}"</p>
      <p><strong>Category:</strong> ${quote.category}</p>
    `;
  }
  
  // Function to add a new quote
  function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value;
    const quoteCategory = document.getElementById('newQuoteCategory').value;
  
    if (quoteText && quoteCategory) {
      quotes.push({ text: quoteText, category: quoteCategory });
      saveQuotes(); // Save the updated quotes array to localStorage
  
      // Clear the input fields
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
  
      // Show the newly added quote
      showRandomQuote();
    } else {
      alert("Please enter both a quote and a category.");
    }
  }
  
  // Function to create and download the JSON file
  function exportToJson() {
    const dataStr = JSON.stringify(quotes, null, 2); // Format with 2 spaces for readability
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    // Create a temporary link to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
  
    // Clean up
    URL.revokeObjectURL(url);
  }
  
  // Function to handle JSON import (file upload)
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
  
    fileReader.onload = function(event) {
      try {
        const importedQuotes = JSON.parse(event.target.result);
        if (Array.isArray(importedQuotes)) {
          quotes = importedQuotes; // Replace quotes array with imported data
          saveQuotes(); // Save to localStorage
          showRandomQuote(); // Optionally show a random quote after importing
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
  
  // Event listener to show a new random quote when the button is clicked
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
  // Initial random quote when the page loads
  window.onload = showRandomQuote;
  
  // Event listeners for JSON import/export
  document.getElementById('exportJson').addEventListener('click', exportToJson);
  document.getElementById('importFile').addEventListener('change', importFromJsonFile);
  
  // Optional: Show the last viewed quote from sessionStorage
  if (sessionStorage.getItem('lastViewedQuote')) {
    const lastQuote = JSON.parse(sessionStorage.getItem('lastViewedQuote'));
    document.getElementById('quoteDisplay').innerHTML = `
      <p>"${lastQuote.text}"</p>
      <p><strong>Category:</strong> ${lastQuote.category}</p>
    `;
  }
  