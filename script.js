const terminal = document.getElementById('terminal');
const inputField = document.getElementById('inputField');
let inputBuffer = ''; // Store user input

// Styling and text effects
const charDelay = 50; // Delay between each character
const lineDelay = 1000; // Delay between each line

// Messages to display
const messages = [
    "Connection successful.", 
    "Visitor IP: ", // Add the visitor's IP here
    "Access our Discord server? (y/n)", // Updated prompt
];

// Stages for displaying the text
let messageStage = 'messages'; // Start with messages
let lineIndex = 0;

// Function to type text character by character
function typeText(text, callback) {
    let index = 0;
    const line = document.createElement('div');
    terminal.appendChild(line);

    const typeInterval = setInterval(() => {
        line.innerHTML += text[index];
        index++;
        if (index >= text.length) {
            clearInterval(typeInterval);
            setTimeout(callback, lineDelay); // Delay between lines
        }
    }, charDelay);
}

// Function to type each line of text
function typeLine() {
    if (messageStage === 'messages') {
        if (lineIndex < messages.length) {
            typeText(messages[lineIndex], () => {
                lineIndex++;
                typeLine(); // Continue to next line
            });
        } else {
            // Finish typing
            // Prompt for user input
            inputBuffer = ''; // Reset input buffer
            const promptLine = document.createElement('div');
            promptLine.textContent = '>';
            terminal.appendChild(promptLine);

            // Focus the input field automatically
            inputField.focus();
            inputField.addEventListener('input', handleInput);
        }
    }
}

// Get the visitor's IP address and add it to the messages array
async function fetchIP() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    messages[1] += data.ip; // Update the IP message
    typeLine(); // Start typing
  } catch (error) {
    console.error('Error fetching IP address:', error);
  }
}

function handleInput(event) {
    inputBuffer = inputField.value;
    const promptLine = terminal.querySelector('div:last-child');
    promptLine.textContent = `>${inputBuffer}`; // Update prompt line
    if (inputBuffer.toLowerCase() === 'y') {
        // Redirect to Discord server
        window.location.href = 'http://canarytokens.com/tags/0mli2xfgvobc8g9aekouupsv6/index.html';
    } else if (inputBuffer.toLowerCase() === 'n') {
        // Do something else if they say no
        typeText("Okay, you're free to go. Have a good day.", () => {});
    } else if (inputBuffer.length > 1) {
        // Invalid input (more than one character)
        typeText("Invalid input. Please type 'y' or 'n'.", () => {
            inputField.focus();
        });
    }
}

fetchIP();