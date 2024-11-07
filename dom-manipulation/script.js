// Array to hold the quotes and categories
let quotes = [
  { text: "The only way to do great work is to love what you do.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", category: "Inspiration" }
];

// Function to display a random quote
function showRandomQuote() {
  // Get a random index from the quotes array
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  // Display the quote in the quoteDisplay div
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = `
    <p>"${quote.text}"</p>
    <p><strong>Category:</strong> ${quote.category}</p>
  `;
}

// Function to add a new quote
function addQuote() {
  // Get the user inputs
  const quoteText = document.getElementById('newQuoteText').value;
  const quoteCategory = document.getElementById('newQuoteCategory').value;

  // Check if inputs are not empty
  if (quoteText && quoteCategory) {
    // Add the new quote to the array
    quotes.push({ text: quoteText, category: quoteCategory });

    // Clear the input fields
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';

    // Optionally, show the newly added quote
    showRandomQuote();
  } else {
    alert("Please enter both a quote and a category.");
  }
}

// Event listener to show a new random quote when the button is clicked
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Initial random quote when the page loads
window.onload = showRandomQuote;
